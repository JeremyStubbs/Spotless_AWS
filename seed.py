from decimal import Decimal
import json
import boto3


def load_movies(songs, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb', region_name='us-east-1')

    table = dynamodb.Table('Music')
    for item in songs:
        try:
            title = item['title']
        except:
            try:
                title = item["title"]
            except:
                title = "not available"
        try:
            artist = item['artist']
        except:
            try:
                artist = item["artist"]
            except:
                artist = "not available"
        try:
            artistLink = item['artistLink']
        except:
            try:
                artistLink = item["artistLink"]
            except:
                artistLink = "not available"
        try:
            album = item['album']
        except:
            try:
                album = item["album"]
            except:
                album = "not available"
        try:
            albumLink = item['albumLink']
        except:
            try:
                albumLink = item["albumLink"]
            except:
                albumLink = "not available"
        try:
            duration = item['duration']
        except:
            try:
                duration = item["duration"]
            except:
                duration = "not available"
        try:
            trackLink = item['trackLink']
        except:
            try:
                trackLink = item["trackLink"]
            except:
                trackLink = "not available"
        try:
            preview = item['preview']
        except:
            try:
                preview = item["preview"]
            except:
                preview = "not available"
        try:
            picture = item['picture']
        except:
            try:
                picture = item["picture"]
            except:
                picture = "not available"
        try:
            genre = item['genre']
        except:
            try:
                genre = item["genre"]
            except:
                genre = "not available"
        final_item = { "SongTitle": title, "Artist": artist, "artistLink": artistLink, "album": album, "albumLink": albumLink, "duration": duration, "trackLink": trackLink, "preview": preview, "picture": picture, "genre": genre}
        table.put_item(Item=final_item)


if __name__ == '__main__':
    with open("seedData.json") as json_file:
        song_list = json.load(json_file, parse_float=Decimal)
    load_movies(song_list)

