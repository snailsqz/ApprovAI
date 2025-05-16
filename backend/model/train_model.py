import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
import os

# === Paths ===
CURRENT_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(CURRENT_DIR, '..', 'data', 'final_dataset.csv')
MODEL_PATH = os.path.join(CURRENT_DIR, 'pipeline.pkl')

# === Load data ===
df = pd.read_csv(DATA_PATH)

# === Drop columns not needed ===
df = df.drop(columns=["ID"])

# === Split data ===
X = df.drop(columns=['Approved'])
y = df['Approved']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

num_cols = ['CNT_CHILDREN', 'AMT_INCOME_TOTAL', 'CNT_FAM_MEMBERS']
cat_cols = ['CODE_GENDER', 'FLAG_OWN_CAR', 'NAME_INCOME_TYPE', 
            'NAME_EDUCATION_TYPE', 'OCCUPATION_TYPE', 'NAME_FAMILY_STATUS', 'NAME_HOUSING_TYPE']

# === Preprocessing ===
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='constant', fill_value='Unknown')),
    ('encoder', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer([
    ('num', num_pipeline, num_cols),
    ('cat', cat_pipeline, cat_cols)
])

# === Final Pipeline ===
full_pipeline = Pipeline([
    ('preprocessing', preprocessor),
    ('model', RandomForestClassifier(random_state=42))
])

# === Train ===
full_pipeline.fit(X_train, y_train)

score = full_pipeline.score(X_test, y_test)
print(f"Model trained. Accuracy on test set: {score:.4f}")

# === Save model ===
joblib.dump(full_pipeline, MODEL_PATH)
print(f"Saved model to {MODEL_PATH}")
