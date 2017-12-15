from __future__ import print_function
import boto3
import datetime
import time
import json

def updateQuant(event, context):
    # TODO implement
    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='',aws_secret_access_key='',region_name='us-east-2')
        purchasesTable = dynamodb.Table('Purchases')
        spendsTable = dynamodb.Table('Spendings')
    except Exception as e:
        print ("Error in getting resource the table 1")
        
    try:
        redeemData1 = json.loads(event['body'])
        redeemData_list = redeemData1['data']
    except Exception as e:
        print("error in json loads")
        responseObj = {"status" : "false", "error" : e}
    else:
        timestamp = str(time.time())
        date = str(datetime.date.today())
        #username = redeemData['username']
        #print(username)
        for redeemData in redeemData_list:
            try:
                username = redeemData['username']
                BottleID = redeemData['BottleID']
                print(BottleID)
                BarID = redeemData['BarID']
                print(BarID)
                purchasesTable.update_item(
                        Key={
                        'UserID': username,
                        'BottleID': BottleID
                        },
                        UpdateExpression='add Quantity :a',
                        ExpressionAttributeValues={
                            ':a': -1
                        }
                    )
                spendingsItem = {
                    "BottleID": BottleID,
                    "BarID": BarID,
                    "TimeStamp": timestamp,
                    "Date": date
                }
                spendsTable.put_item(
                   Item=spendingsItem
                )
            except Exception as e:
                print("Error in DynamoDB query")
                responseObj = {"status" : "false", "message": "Error in DynamoDB query."}
            else:
                responseObj = {"status" : "true", "message": "Spendings and Quantity updated."}
        
    response = {
        'statusCode' : 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(responseObj)
    }
    return response
