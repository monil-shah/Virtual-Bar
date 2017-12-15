from __future__ import print_function
import datetime
import boto3
import json
import time
import uuid
from boto3.dynamodb.conditions import Key, Attr

def getBarsData(event, context):

    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='',aws_secret_access_key='',region_name='us-east-2')
        table = dynamodb.Table('Bar')
    except Exception as e:
        print ("Error in getting resource the table 1")
    else:

        try:
            
            bars_data = table.scan()
            '''
            bars_data = table.query(
                KeyConditionExpression = Key('City').eq("Manhattan")
            )
            '''
        except Exception as e:

            responseObj = {"status" : "false", "message" : e }
        else:

            print(bars_data)

            bars = dict()

            for i in bars_data['Items']:
                tier = 'Tier'+str(i['Tier'])
                if tier not in bars:
                    bars[tier] = []
                
                item = dict()

                item['BarID'] = str(i['BarID'])
                item['Latitude'] = str(i['Location']['Latitude'])
                item['Longitude'] = str(i['Location']['Longitude'])
                item['Tier'] = str(i['Tier'])
                item['City'] = str(i['City'])
                item['Name'] = str(i['Name'])
                bars[tier].append(item)

            responseObj = {"status" : "true", "bars" : bars }

    response = {
        'statusCode' : 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(responseObj)
    }

    return response