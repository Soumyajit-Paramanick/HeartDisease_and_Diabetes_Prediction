from flask import Blueprint, request, jsonify
import pickle
import pandas as pd

diabetes_bp = Blueprint("diabetes_bp", __name__)

# ---------------------------------------------------
# STEP 1 → Load saved best diabetes model
# ---------------------------------------------------

artifact = pickle.load(open("models/best_diabetes_model.pkl", "rb"))

model = artifact["model"]
scaler = artifact["scaler"]
encoders = artifact["encoders"]
to_drop = artifact["to_drop"]


# ===================================================
# ✅ CHANGED PART 1
# OLD FEATURES:
# Pregnancies, Glucose, BloodPressure...
#
# NEW FEATURES (matches your actual dataset):
# gender, age, hypertension, heart_disease,
# smoking_history, bmi, HbA1c_level,
# blood_glucose_level
# ===================================================

feature_order = [
    "gender",
    "age",
    "hypertension",
    "heart_disease",
    "smoking_history",
    "bmi",
    "HbA1c_level",
    "blood_glucose_level"
]


# ---------------------------------------------------
# STEP 2 → Prediction Route
# ---------------------------------------------------

@diabetes_bp.route("/api/diabetes-prediction", methods=["POST"])
def predict_diabetes():
    try:
        data = request.json

        # ---------------------------------------------------
        # STEP 3 → Convert frontend JSON to DataFrame
        # ---------------------------------------------------

        input_df = pd.DataFrame([data])

        print("RAW INPUT:")
        print(input_df)


        # ---------------------------------------------------
        # STEP 4 → Maintain exact dataset order
        # ---------------------------------------------------

        input_df = input_df.reindex(
            columns=feature_order,
            fill_value=0
        )


        # ---------------------------------------------------
        # STEP 5 → Numeric conversion
        #
        # Only numeric fields convert to number
        #
        # gender + smoking_history remain string
        # for LabelEncoder
        # ---------------------------------------------------

        numeric_columns = [
            "age",
            "hypertension",
            "heart_disease",
            "bmi",
            "HbA1c_level",
            "blood_glucose_level"
        ]

        for col in numeric_columns:
            input_df[col] = pd.to_numeric(
                input_df[col],
                errors="coerce"
            )


        # ---------------------------------------------------
        # STEP 6 → Apply Label Encoding
        #
        # For:
        # gender
        # smoking_history
        # ---------------------------------------------------

        for col in input_df.columns:
            if col in encoders:
                input_df[col] = encoders[col].transform(
                    input_df[col]
                )

        print("AFTER ENCODING:")
        print(input_df)


        # ---------------------------------------------------
        # STEP 7 → Drop same correlated columns
        # removed during training
        # ---------------------------------------------------

        input_df = input_df.drop(
            columns=to_drop,
            errors="ignore"
        )

        print("AFTER DROP:")
        print(input_df)


        # ---------------------------------------------------
        # STEP 8 → Maintain same columns
        # after correlation dropping
        #
        # No SelectKBest here
        # ---------------------------------------------------

        training_columns_after_drop = [
            col for col in feature_order
            if col not in to_drop
        ]

        input_df = input_df.reindex(
            columns=training_columns_after_drop,
            fill_value=0
        )

        print("FINAL INPUT TO MODEL:")
        print(input_df)
        print(input_df.shape)


        # ---------------------------------------------------
        # STEP 9 → Apply StandardScaler
        # ---------------------------------------------------

        input_scaled = scaler.transform(
            input_df
        )


        # ---------------------------------------------------
        # STEP 10 → Final Prediction
        # ---------------------------------------------------

        prediction = model.predict(
            input_scaled
        )[0]

        probability = model.predict_proba(
            input_scaled
        )[0][1]


        # ---------------------------------------------------
        # STEP 11 → Final Response
        # ---------------------------------------------------

        result = "Yes" if prediction == 1 else "No"

        return jsonify({
            "prediction": result,
            "probability": round(
                float(probability), 4
            )
        })


    # ---------------------------------------------------
    # STEP 12 → Proper Error Handling
    # ---------------------------------------------------

    except Exception as e:
        print("BACKEND ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500