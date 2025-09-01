from django.db import models

class Company(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField()
    image=models.CharField(max_length=100)
    numberOfStores=models.IntegerField()
    code=models.CharField(max_length=20,unique=True)
    password=models.CharField(max_length=20)

class Store(models.Model):
    code=models.CharField(max_length=20,unique=True)
    password=models.CharField(max_length=20)
    numberEmployees=models.IntegerField()
    numberOfCashRegisters=models.IntegerField()
    company_id=models.IntegerField()

class Employee(models.Model):
    name=models.CharField(max_length=20)
    surname=models.CharField(max_length=20)
    username=models.CharField(max_length=20,unique=True)
    password=models.CharField(max_length=20)
    logedIn=models.BooleanField()
    start=models.DateTimeField()
    register_id=models.IntegerField()
    store_id=models.IntegerField()
    role=models.CharField(max_length=20, default="cashier")

class Register(models.Model):
    used=models.BooleanField()
    store_id=models.IntegerField()
    employee_id=models.IntegerField(default=0)

class Product(models.Model):
    store_id=models.IntegerField()
    image=models.CharField(max_length=500)
    name=models.CharField(max_length=20)
    code=models.CharField(max_length=20)
    price=models.IntegerField(default=0)
    limitedEdition=models.BooleanField()
    description=models.TextField()
    maxItems=models.IntegerField()
    minItems=models.IntegerField()
    numItems=models.IntegerField()
    newPrice=models.IntegerField(default=0)

class Bill(models.Model):
    store_id=models.IntegerField()
    employee_id=models.IntegerField()
    time=models.DateTimeField()
    cost=models.IntegerField()
    products=models.JSONField()

class Package(models.Model):
    store_id=models.IntegerField()
    product_id=models.IntegerField()
    employee_id=models.IntegerField()
    items=models.IntegerField()
    time=models.DateTimeField()

class InCart(models.Model):
    register_id=models.IntegerField(default=0)
    product_id=models.IntegerField()
    code=models.CharField(max_length=20,default="")
    name=models.CharField(max_length=30,default="")
    price = models.FloatField()
    numberInstances=models.IntegerField()
    toBuy=models.IntegerField(default=0)

class EmployeeWorkTime(models.Model):
    store_id=models.IntegerField(default=5)
    employee_id=models.IntegerField()
    start=models.DateTimeField()
    end=models.DateTimeField()

class RefundBill(models.Model):
    store_id=models.IntegerField()
    employee_id=models.IntegerField()
    time=models.DateTimeField()
    cost=models.IntegerField()
    products=models.JSONField()
    timeRefund=models.DateTimeField()


    




