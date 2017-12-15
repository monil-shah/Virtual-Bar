from __future__ import print_function
import datetime
import boto3
import json
import time
import uuid
from boto3.dynamodb.conditions import Key, Attr

# Aakar and Jayesh contributed for this

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
    


# Get the details for bot by city
def get_bot_by_city(event):
    
    try:
        loc_name = event['currentIntent']['slots']['loc_name']
        
        try:
            dynamodb = boto3.resource('dynamodb', aws_access_key_id='',aws_secret_access_key='',region_name='us-east-2')
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


# main dispatch method
def dispatch(intent_request):
    """
    Called when the user specifies an intent for this bot.
    """
    intent_name = intent_request['currentIntent']['name']

    # Dispatch to your bot's intent handlers
    if intent_name == 'FindNearestBars':
        return get_bot_by_city(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')
    
    if intent_name == 'Intro':
        return get_intro(intent_request)

    raise Exception('Intent with name ' + intent_name + ' not supported')

""" --- Main handler of Lex code --- """
def lambda_handler(event, context):
    return dispatch(event)

