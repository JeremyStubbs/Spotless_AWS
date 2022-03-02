
import boto3
from boto3.dynamodb.conditions import Key


def get_song(artist, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

    table = dynamodb.Table('Music')

    response = table.query(
        KeyConditionExpression=Key('Artist').eq(artist)
    )
    return response['Items']


if __name__ == '__main__':
    query_artist = "Ramones"
    songs = get_song(query_artist)
    for song in songs:
        print(song['SongTitle'])