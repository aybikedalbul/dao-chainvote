from rest_framework import generics
from .models import Proposal
from .serializers import ProposalSerializer

class ProposalListCreateView(generics.ListCreateAPIView):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer
