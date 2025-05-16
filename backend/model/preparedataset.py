import pandas as pd
app = pd.read_csv("backend/data/application_record.csv")
credit = pd.read_csv("backend/data/credit_record.csv")

default_ids = credit[credit['STATUS'].isin(['2', '3', '4', '5'])]['ID'].unique()
app['Approved'] = app['ID'].apply(lambda x: 0 if x in default_ids else 1)

final_df = app.copy()

print(final_df[['ID', 'Approved']].head())
print("จำนวนตัวอย่างทั้งหมด:", len(final_df))
print("จำนวนอนุมัติ:", (final_df['Approved'] == 1).sum())
print("จำนวนไม่อนุมัติ:", (final_df['Approved'] == 0).sum())

final_df.to_csv("backend/data/final_dataset.csv", index=False)

