from rest_framework import serializers
from .models import Company,Store,Bill,Employee,EmployeeWorkTime,InCart,Package,Product,Register,RefundBill

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class RefundBillSerializer(serializers.ModelSerializer):
    class Meta:
        model = RefundBill
        fields = '__all__'

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bill
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

class EmployeeWorkTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeWorkTime
        fields = '__all__'

class InCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = InCart
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = '__all__'