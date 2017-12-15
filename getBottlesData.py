from __future__ import print_function
import datetime
import boto3
import json
import time
import uuid
from boto3.dynamodb.conditions import Key, Attr

def getBottlesData(event, context):
    
    
    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='',aws_secret_access_key='',region_name='us-east-2')
        table = dynamodb.Table('Purchases')
    except Exception as e:
        print ("Error in getting resource the table 1")
        
    try:
        UserData = json.loads(event['body'])
    except Exception as e:
        print("error in json loads")
        responseObj = {"status" : "false", "error" : e}
    else:
        UserID = UserData['username']
            
        #bottles_data = table.query(
        #    "KeyConditionExpression" = "UserID = :uid",
        #    "ExpressionAttributeValues" = {":uid": UserID},
        #    "ProjectionExpression" = 'BottleID', 'Quantity', 'DrinkID'
        #)    
        
        #response = table.query(
        #    KeyConditionExpression=Key('order_number').eq(myordernumber)
        #)
    
        try:
    
            bottles_data = table.query(
                KeyConditionExpression = Key('UserID').eq(UserID)
            )
            
            print(bottles_data)
            print('Exception in getting user data from table')
            
               
            bottles = dict()
            bottles['current'] = list()
            bottles['previous'] = list()
            bottles['redeemed'] = list()
            
            # bottles_current = list()
            # bottles_previous = list()
            
            for i in bottles_data['Items']:
                item = dict()
                item['BottleID'] = str(i['BottleID'])
                item['Quantity'] = str(i['Quantity'])
                item['DrinkID'] = str(i['DrinkID'])
                item['Name'] = str(i['Name'])
                item['Url'] = str(i['Url'])
                item['Price'] = str(i['Price'])
            
                if(int(item['Quantity']) == 10):
                    bottles['current'].append(item)
                elif((int(item['Quantity']) > 0) and (int(item['Quantity']) < 10)):
                    bottles['redeemed'].append(item)
                else:
                    bottles['previous'].append(item)
            
            # responseObj = {"status" : "true", "current" : bottles_current, "previous" : bottles_previous}
            responseObj = {"status" : "true", "Bottles":bottles}
        except Exception as e:
            responseObj = {"status" : "false", "message" : "No Data exists Sorry" }
            
    response = {
        'statusCode' : 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(responseObj)
    }
        
    return response