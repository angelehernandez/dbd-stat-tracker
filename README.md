
# dbd-stat-tracker
This project is a data tracker for Dead by Daylight. A single game will consist of 5 players, 4 survivors and 1 killer, each able to select a loadout of up to 8 elements. A screenshot of a post-match scoreboard is shown below:
![enter image description here](https://i.ibb.co/4NJ8yfx/dbd-screenshot.png)

The following data will be saved from each survivor:
- **Rank** (*required*): the skill rating used for matchmaking
- **Name** (*optional*): the player's account's name
- **Perks** (*optional*): unlockables granting survivors special abilities in the game, located beneath each survivor's name
- **Item** (*optional*): an unlockable survivors can use to aid their escape form the trial, located in between the offering and add-on slots
- **Add-ons** (*optional, requires an item*): unlockables used to boost specific aspects of a survivor's item when equipped, located in between the item slot and score
- **Score** (*required*): bloodpoints earned from the trial used to purchase unlockables
- **Status** (*required*): whether or not a survivor escaped the trial

The same data will be saved for the killer player (located at the bottom of the scoreboard) with a few differences:
- **Power** (*required*): unique ability for each type of killer, counterpart to a survivor item
- **Kills** (*required*):: number of survivors that did not escape the trial, counterpart to a survivor's status

This data is saved to MongoDB. 

## Available Scripts

  

In the project directory, you can run:

  

### `npm run populate`

  

Resets and fills the MongoDB with data found in ./config/data.json. (same as `GET /reset`)

This script is for testing and development purposes.

  

### `npm run main`

  
Runs the app on port 8081.
Open [http://localhost:8081](http://localhost:8081) to view it in the browser. A successful response reads "App is running."
Currently, the app is running on [Heroku](http://dbd-stat-tracjer.herokuapp.com/).
  
## Usage

Currently, the data is hosted on MongoDB. A `.env` file is required with a cloning of the repo. My environment variables have been submitted in # P2: Project Checkpoint #1 on Canvas. 
### Routes Implemented
- /reset
	- `.get`: resets database to default data I include
- /
	- `.get`: confirms app is running
- /survivors
	- `.get`: shows survivors in database
	- `.post`: adds 4 survivors to the database
- /killers
	- `.get`: shows killers in database
	- `.post`: adds 1 killer to the database

In order to post survivors, 4 must be provided in a list with the following fields:
- **rank** (*required*): number
- **name** (*optional*): string
- **perks** (*optional*): list of strings
- **offering** (*optional*): string
- **item** (*optional*): string
- **addOns** (*optional*): lsit of strings
- **score** (*required*): number
- **escaped** (*required*): boolean

In order to post killers, 1 must be provided (not in a list) with the following fields:
- **rank** (*required*): number
- **name** (*optional*): string
- **perks** (*optional*): list of strings
- **offering** (*optional*): string
- **power** (*optional*): string
- **addOns** (*optional*): lsit of strings
- **score** (*required*): number
- **kills** (*required*): boolean
