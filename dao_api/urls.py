from django.urls import path
from .views import ProposalListCreateView

urlpatterns = [
    path('proposals/', ProposalListCreateView.as_view(),  name='create'),
]