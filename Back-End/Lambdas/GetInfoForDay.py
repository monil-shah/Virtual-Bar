from __future__ import print_function
import datetime
import boto3
import json
import time
import uuid
from boto3.dynamodb.conditions import Key, Attr

def GetInfoForDay(event, context):
    
    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='',aws_secret_access_key='',region_name='us-east-2')
        table = dynamodb.Table('Purchases')
        spendingsTable = dynamodb.Table('Spendings')
    except Exception as e:
        print ("Error in getting resource the table 1")
        
    
    UserData = json.loads(event['body'])
    UserID = UserData['username']
            
    
        
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    bottles_data = table.query(
        KeyConditionExpression = Key('UserID').eq(UserID)
    )
            
    print(bottles_data)
    bottles_list = list()
    
    # bottles_current = list()
    # bottles_previous = list()
            
    for i in bottles_data['Items']:
        bottles_list.append(i['BottleID'])
            
    spendingsToday = 0
    for i in bottles_list:
        spendings = spendingsTable.scan(
        FilterExpression = Key('BottleID').eq(i) & Key('Date').eq(today)
        )
        spendingsToday += len(spendings['Items'])
    print(spendingsToday)
                    
            
    # responseObj = {"status" : "true", "current" : bottles_current, "previous" : bottles_previous}
    responseObj = {"status" : "true", "spendingsToday": str(spendingsToday)}
        
            
    response = {
        'statusCode' : 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(responseObj)
    }
        
    return response