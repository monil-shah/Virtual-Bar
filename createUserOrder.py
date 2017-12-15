from __future__ import print_function
import datetime
import boto3
import json
import time
import uuid

def createUserOrder(event, context):
    
    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='',aws_secret_access_key='',region_name='us-east-2')
        table = dynamodb.Table('Purchases')
    except Exception as e:
        print ("Error in getting resource the table 1")
        
    try:
        purchase = json.loads(event['body'])
        purchase_data = purchase['data']
    
    except Exception as e:
        print("error in json loads")
        responseObj = {"status" : "false", "error" : e}
    else:
        timestamp = str(time.time())
        date = str(datetime.date.today())
        
        for purchase in purchase_data:
            try:
                table.put_item(
                    Item={
                        'UserID': purchase['username'],
                        'BottleID': str(uuid.uuid4().hex),  
                        'DrinkID' : purchase['Id'],
                        'Price': purchase['Price'],
                        'Tier': purchase['Tier'],
                        'Url': purchase['Url'],
                        'Name' : purchase['Name'],
                        'Timestamp': timestamp,
                        'Date' : date,
                        'Quantity' : 10 
                    }
                )
            except Exception as e:
                print("Error in Parsing the object", e)
                responseObj = {"status" : "false"}
            else:
                responseObj = {"status" : "true"}
        
        
    response = {
        'statusCode' : 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(responseObj)
    }
        
    return response