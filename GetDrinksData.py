import boto3
from boto3.dynamodb.conditions import Key, Attr
import json

def GetDrinksData(event, context):
    # TODO implement
    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='',aws_secret_access_key='',region_name='us-east-2')
        table = dynamodb.Table('Drinks')
    except Exception as e:
        print ("Error in getting resource the table 1")
    
    drinksData = table.scan()
    
    drinks = dict()
    drinks['Wine'] = list()
    drinks['Vodka'] = list()
    drinks['Rum'] = list()
    drinks['Whiskey'] = list()
    
    for i in drinksData['Items']:
        drinkItem = dict()
        drinkItem['Name'] = i['Name']
        drinkItem['Url'] = i['Name'].replace(" ", "")+'.jpg'
        drinkItem['Price'] = int(i['Price'])
        drinkItem['Id'] = i['DrinkID']
        drinkItem['Brand'] = i['Brand']
        drinkItem['Tier'] = 1
        
        drinks[i['Type']].append(drinkItem)
    
    responseObj = {"status" : "true", "DrinksData" : drinks}
    
    response = {
        'statusCode' : 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(responseObj)
    }
        
    return response