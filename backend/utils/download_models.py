import os
import gdown


def download_models():

    os.makedirs("models", exist_ok=True)

    heart_model_path = "models/best_heart_model.pkl"
    diabetes_model_path = "models/best_diabetes_model.pkl"

    # Heart Model
    if os.path.exists(heart_model_path):
        print("Heart model already exists.")

    else:
        print("Downloading heart model...")

        gdown.download(
            id="1NbkKcp8QrJBUM7DLWl3G-N_fI-Shy68w",
            output=heart_model_path,
            quiet=False
        )

    # Diabetes Model
    if os.path.exists(diabetes_model_path):
        print("Diabetes model already exists.")

    else:
        print("Downloading diabetes model...")

        gdown.download(
            id="1Zu1sXG6TxNOxGCGu0hHmU3-d8fLHLHhl",
            output=diabetes_model_path,
            quiet=False
        )

    print("Models ready.")