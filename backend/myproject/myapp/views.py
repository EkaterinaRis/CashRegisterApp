from django.shortcuts import render
from rest_framework import viewsets
# from rest_framework.views import APIView
# from rest_framework.response import Response
from .models import Company,Store,Bill,Employee,EmployeeWorkTime,InCart,Package,Product,Register,RefundBill
from .serializers import CompanySerializer,RefundBillSerializer, StoreSerializer,BillSerializer,EmployeeSerializer,EmployeeWorkTimeSerializer,InCartSerializer,PackageSerializer,ProductSerializer,RegisterSerializer

class RefundBillView(viewsets.ModelViewSet):
    queryset = RefundBill.objects.all()
    serializer_class = RefundBillSerializer

class CompanyView(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    
    # def get(self, request):
    #     items = Company.objects.all()
    
    #     serializer = CompanySerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = CompanySerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class StoreView(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    # def get(self, request):
    #     items = Store.objects.all()
    #     serializer = StoreSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = StoreSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class BillView(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer
    # def get(self, request):
    #     items = Bill.objects.all()
    #     serializer = BillSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = BillSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class EmployeeView(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    # def get(self, request):
    #     items = Employee.objects.all()
    #     serializer = EmployeeSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = EmployeeSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class EmployeeWorkTimeView(viewsets.ModelViewSet):
    queryset = EmployeeWorkTime.objects.all()
    serializer_class = EmployeeWorkTimeSerializer
    # def get(self, request):
    #     items = EmployeeWorkTime.objects.all()
    #     serializer = EmployeeWorkTimeSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = EmployeeWorkTimeSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class InCartView(viewsets.ModelViewSet):
    queryset = InCart.objects.all()
    serializer_class = InCartSerializer
    # def get(self, request):
    #     items = InCart.objects.all()
    #     serializer = InCartSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = InCartSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class PackageView(viewsets.ModelViewSet):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    # def get(self, request):
    #     items = Package.objects.all()
    #     serializer = PackageSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = PackageSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # def get(self, request):
    #     items = Product.objects.all()
    #     serializer = ProductSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = ProductSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)

class RegisterView(viewsets.ModelViewSet):
    queryset = Register.objects.all()
    serializer_class = RegisterSerializer
    # def get(self, request):
    #     items = Register.objects.all()
    #     serializer = RegisterSerializer(items, many=True)
    #     return Response(serializer.data)

    # def post(self, request):
    #     serializer = RegisterSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)