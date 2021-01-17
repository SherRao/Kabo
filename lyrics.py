import lyricsgenius
from copy import deepcopy

#   func if artist exists //////////not
#   func lyric done
#   funct list of user lyrics and check both (assume list of user lyrics)

#   genius token get
with open('genius_token.txt') as f:
    genius_token = f.readline()

genius = lyricsgenius.Genius(genius_token)

#artist = genius.search_artist("Drake", max_songs=3, sort="title")
# print(artist.songs)

# Turn off status messages
genius.verbose = False

# Remove section headers (e.g. [Chorus]) from lyrics when searching
genius.remove_section_headers = True

# Include hits thought to be non-songs (e.g. track lists)
genius.skip_non_songs = False

# Exclude songs with these words in their title
genius.excluded_terms = ["(Live)"]


#   takes song and artist name and returns a list of strings containing the
#   lyrics without punctuation
def get_lyric_list(song_name: str, artist_name: str):
    song = genius.search_song(song_name, artist_name)
    #   song.lyrics --> string of lyrics with punctuation

    #print(song.lyrics + "\n-----------------------\n")

    lower_lyr = song.lyrics.lower()
    lyric_list = lower_lyr.split()  # might contain punc. at end of words

    punctuation = [',', ';', ':', '!', '?', '&', '(', ')']
    lyric_list_noPunc = deepcopy(lyric_list)

    # print(lyric_list_noPunc)

    #   removes punctuation at beginning and end of word
    for i in range(len(lyric_list_noPunc)):
        for char in punctuation:
            lyric_list_noPunc[i] = lyric_list_noPunc[i].replace(char, "")

    # print('\n-------------------\n')
    return lyric_list_noPunc  # list of lyrics


# Takes two lists of strings and returns a score value
def compare_lyrics(lyric_list: list, user_list: list):
    sum = 0
    for i in range(len(lyric_list)):
        if(lyric_list[i] == user_list[i]):
            sum += 1

    diff = sum / len(lyric_list) * 100
    return diff

#   Function to print the lyrics str of the desired song


def print_lyrics(song_name: str, artist_name: str):
    song = genius.search_song(song_name, artist_name)
    return song.lyrics
