from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_data, name='get_data'), # Maps to the root of the app, e.g., /data/
]
