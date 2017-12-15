from __future__ import print_function
import datetime
import boto3
import json
import time
import uuid
import random
from boto3.dynamodb.conditions import Key, Attr

# Get info for day
def get_fact(event):
    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='AKIAI64S4XNPWDN5FVKQ',aws_secret_access_key='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',region_name='us-east-2')
        table = dynamodb.Table('Fact')
    except Exception as e:
        message = "Error in getting resource the table 1"
    
    temp = random.randint(1,16)
    fact_data = table.query(
        KeyConditionExpression = Key('FactID').eq(temp)
    )
    
    message = fact_data["Fact"]
                    
    return {
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": message
            }
        }
    }

# Get info for day
def get_info_day(event):
    
    try:
        dynamodb = boto3.resource('dynamodb', aws_access_key_id='AKIAI64S4XNPWDN5FVKQ',aws_secret_access_key='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',region_name='us-east-2')
        table = dynamodb.Table('Purchases')
        spendingsTable = dynamodb.Table('Spendings')
    except Exception as e:
        message = "Error in getting resource the table 1"
    
    aakar = ""    
    try:
        UserID = event['userId']
        aakar = event['userId']
    except e as Exception:
        aakar = "No error"
        
    UserID = "Monil"
    
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
    
    message = ""
    
    if spendingsToday > 4:
        message = "You have drank "+str(spendingsToday)+" pegs. You have drank too much. Please avoid driving, call Uber/ Lyft"
    else:
        message = "You have drank only "+str(spendingsToday)+" pegs. Enjoy our App, Get cheap drinks, Recommend to friends and Stay connected"
                    
    return {
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": message
            }
        }
    }



# Function for getting introductory information for bot
def get_intro(event):
    return {
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": "Hey there! I'm Lex Bot. Here at your service. I can help you find nearby bars and share some bar facts. Just shoot me some text."
            }
        }
    }
    

# Function for getting the location name by City
def get_bot_by_city(event):
    
    try:
        loc_name = event['currentIntent']['slots']['loc_name']
        
        try:
            dynamodb = boto3.resource('dynamodb', aws_access_key_id='AKIAI64S4XNPWDN5FVKQ',aws_secret_access_key='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',region_name='us-east-2')
            table = dynamodb.Table('Bar')
        except Exception as e:
            loc_name = "error in Dynamo DB"
        else:
            try:
                if (loc_name.lower() == "brooklyn"):
                    
                    bars_data = table.scan(
                        FilterExpression = Attr('Zip').eq('11201')
                    )
                    
                    loc_name = ""
                    for i in bars_data['Items']:
                        loc_name += i['Name']  
                        loc_name += ' and '
                
                elif (loc_name.lower() == "manhattan"):
                    bars_data = table.scan(
                        FilterExpression = Attr('Zip').eq('10003')
                    )
                    
                    loc_name = ""
                    for i in bars_data['Items']:
                        loc_name += i['Name']  
                        loc_name += ' and '
                else:
                    loc_name = "Parsing error"
            
            except Exception as e:
                loc_name = "error in query"
            
        
    except Exception as e:
        loc_name = "error in getting data"
        
    
    # TODO implement
    return {
        "dialogAction": {
            "type": "Close",
            "fulfillmentState": "Fulfilled",
            "message": {
                "contentType": "PlainText",
                "content": "Hey, I found the following bars: " + str(loc_name)[:-4] + " near your location. Enjoy."
            }
        }
    }    


def dispatch(intent_request):
    """
    Called when the user specifies an intent for this bot.
    """
    intent_name = intent_request['currentIntent']['name']

    # Dispatch to your bot's intent handlers
    if intent_name == 'FindNearestBars':
        return get_bot_by_city(intent_request)

    #raise Exception('Intent with name ' + intent_name + ' not supported')
    
    if intent_name == 'Intro':
        return get_intro(intent_request)

    if intent_name == 'MyDayDrink':
        return get_info_day(intent_request)
        
    if intent_name == 'Fact':
        return get_fact(intent_request)


    #raise Exception('Intent with name ' + intent_name + ' not supported')

""" --- Main handler --- """
def lambda_handler(event, context):
    return dispatch(event)
