from flask import Blueprint, request, jsonify
import pickle
import pandas as pd

heart_bp = Blueprint("heart_bp", __name__)

# ---------------------------------------------------
# STEP 1 → Load saved best model (.pkl)
# ---------------------------------------------------

artifact = pickle.load(open("models/best_heart_model.pkl", "rb"))

model = artifact["model"]
scaler = artifact["scaler"]
selector = artifact["selector"]
encoders = artifact["encoders"]
to_drop = artifact["to_drop"]
selected_columns = artifact["selected_columns"]


# ---------------------------------------------------
# STEP 2 → Original frontend/raw dataset column order
# MUST match frontend form + original dataset
# ---------------------------------------------------

feature_order = [
    "BMI",
    "Smoking",
    "AlcoholDrinking",
    "Stroke",
    "PhysicalHealth",
    "MentalHealth",
    "DiffWalking",
    "Sex",
    "AgeCategory",
    "Race",
    "Diabetic",
    "PhysicalActivity",
    "GenHealth",
    "SleepTime",
    "Asthma",
    "KidneyDisease",
    "SkinCancer"
]


# ---------------------------------------------------
# STEP 3 → Prediction Route
# ---------------------------------------------------

@heart_bp.route("/api/heart-prediction", methods=["POST"])
def predict_heart():
    try:
        data = request.json

        # ---------------------------------------------------
        # STEP 4 → Convert frontend JSON to DataFrame
        # ---------------------------------------------------

        input_df = pd.DataFrame([data])

        print("RAW INPUT:")
        print(input_df)


        # ---------------------------------------------------
        # STEP 5 → Keep same raw column order first
        # ---------------------------------------------------

        input_df = input_df.reindex(
            columns=feature_order,
            fill_value=0
        )


        # ---------------------------------------------------
        # STEP 6 → Convert numeric columns
        # ---------------------------------------------------

        for col in input_df.columns:
            try:
                input_df[col] = pd.to_numeric(input_df[col])
            except:
                pass


        # ---------------------------------------------------
        # STEP 7 → Apply same Label Encoding
        # used during training
        # ---------------------------------------------------

        for col in input_df.columns:
            if col in encoders:
                input_df[col] = encoders[col].transform(
                    input_df[col]
                )

        print("AFTER ENCODING:")
        print(input_df)


        # ---------------------------------------------------
        # STEP 8 → Drop same correlated columns
        # removed during training
        # ---------------------------------------------------

        input_df = input_df.drop(
            columns=to_drop,
            errors="ignore"
        )

        print("AFTER DROP:")
        print(input_df)


        # ---------------------------------------------------
        # STEP 9 → VERY IMPORTANT FIX
        #
        # DO NOT use selected_columns here
        #
        # selector.transform() expects:
        # all columns AFTER to_drop
        #
        # NOT only selected columns
        # ---------------------------------------------------

        training_columns_after_drop = [
            col for col in feature_order
            if col not in to_drop
        ]

        input_df = input_df.reindex(
            columns=training_columns_after_drop,
            fill_value=0
        )

        print("BEFORE SELECTOR:")
        print(input_df)
        print(input_df.shape)


        # ---------------------------------------------------
        # STEP 10 → Apply SelectKBest
        # ---------------------------------------------------

        input_selected = selector.transform(input_df)

        print("AFTER SELECTOR:")
        print(input_selected.shape)


        # ---------------------------------------------------
        # STEP 11 → Apply StandardScaler
        # ---------------------------------------------------

        input_scaled = scaler.transform(
            input_selected
        )


        # ---------------------------------------------------
        # STEP 12 → Final Prediction
        # ---------------------------------------------------

        prediction = model.predict(
            input_scaled
        )[0]

        probability = model.predict_proba(
            input_scaled
        )[0][1]


        # ---------------------------------------------------
        # STEP 13 → Final Response
        # ---------------------------------------------------

        result = "Yes" if prediction == 1 else "No"

        return jsonify({
            "prediction": result,
            "probability": round(
                float(probability), 4
            )
        })


    # ---------------------------------------------------
    # STEP 14 → Proper Error Debugging
    # ---------------------------------------------------

    except Exception as e:
        print("BACKEND ERROR:", str(e))

        return jsonify({
            "error": str(e)
        }), 500