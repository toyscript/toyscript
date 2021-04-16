import os

db_url = os.getenv("toyscriptDbConnectionUrl")
SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://suram:suram@elice-kdt-ai-track-vm-da-04.koreacentral.cloudapp.azure.com/toyscript2?charset=utf8mb4'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = "ThisisToyScript"
PROPAGATE_EXCEPTIONS=True