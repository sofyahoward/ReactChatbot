import {
  optionCards,
  selectField,
  tagsField,
  textField,
  disabledFieldText,
  endOfConversation,
} from '../StateFormatter';
import * as RTypes from '../responseTypes';

const common_greetings = /(^hello|^hllo|^hi|^hey|^hola|^sup)\b\s?.*$/i;
const common_greetings_negative = /(?!(^hello|^hi|^hey|^hllo|^sup|^hola)\b)\w+/i;

const gender_boy = 'Boy';
const gender_girl = 'Girl';

const questions = {
  start: {
    botPrompt: 'Hey! We\'re going to ask you a few questions about your dog(s) so we can curate supplements personalized just for them!',
    answers: [
      {
        nextId: 'yourName',
      },
    ],
  },
  yourName: {
    botPrompt: 'Let\'s get started. What\'s your name?',
    input: textField(),
    answers: [
      {
        answer: common_greetings,
        nextId: 'greetings_notAName',
      },
      {
        answer: common_greetings_negative,
        catchName: true,
        nextId: 'asYouCanSee',
      },
    ],
  },
  greetings_notAName: {
    botPrompt: 'Hello! <strong>I\'m still learning how to talk to humans</strong>, which means my conversational range is not very wide yet... 😅',
    answers: [
      {
        nextId: 'greetings_whatsYourNameAgain',
      },
    ],
  },
  greetings_whatsYourNameAgain: {
    botPrompt: 'So what’s <strong>your name</strong>?',
    input: textField(),
    answers: [
      {
        answer: common_greetings,
        nextId: 'greetings_notAName',
      },
      {
        answer: common_greetings_negative,
        catchName: true,
        nextId: 'asYouCanSee',
      },
    ],
  },
  asYouCanSee: {
    botPrompt: 'Nice to meet you @varName! How many dogs do you have?',
    input: textField(),
    type: RTypes.TRANSFORMED_TEXT,
    varName: 'userName',
    answers: [
      { nextId: 'dogName' },
    ],
  },
  dogName: {
    botPrompt: "What is your dogs name?",
    input: textField(),
    answers: [
      {
        //this is to save the dog's Name
        catchCompanyName: true,
        nextId: 'selectGender'
      },
    ],
  },
  selectGender: {
    botPrompt: 'What is @varName\'s gender?',
    input: selectField(['Girl', 'Boy']),
    type: RTypes.TRANSFORMED_TEXT,
    //varName is set to the saved company's name
    varName: 'companyName',
    answers: [
      {
        answer: gender_boy,
        nextId: 'neuteredOrNot',
      },
      {
        answer: gender_girl,
        nextId: 'spayedOrNot',
      },
    ],
  },
  neuteredOrNot: {
    botPrompt: '@varName is',
    varName: 'companyName',
    input: selectField(['Neutered', 'Not Neutered']),
    type: RTypes.TRANSFORMED_TEXT,
    answers: [
      { nextId: 'activityLevel' },
    ],
  },
  spayedOrNot: {
    botPrompt: '@varName is',
    varName: 'companyName',
    input: selectField(['Spayed', 'Not Spayed']),
    type: RTypes.TRANSFORMED_TEXT,
    answers: [
      { nextId: 'activityLevel' },
    ],
  },
  activityLevel: {
    botPrompt: 'How active would you say @varName is',
    varName: 'companyName',
    input: selectField(['Couch Potato', 'Moderate', 'Above Average', 'Athletic']),
    type: RTypes.TRANSFORMED_TEXT,
    answers: [
      {
        answer: 'Couch Potato',
        nextId: 'lazyPup',
      },
      {
        answer: 'Moderate',
        nextId: 'moderatePup',
      },
      {
        answer: 'Above Average',
        nextId: 'averagePup',
      },
      {
        answer: 'Athletic',
        nextId: 'athleticPup',
      },
    ],
  },
  lazyPup: {
    botPrompt: 'Aww a lazy pup! Almost done now moving on to the details',
    answers: [
      { nextId: 'lazyPupGif' },
    ],
  },
  lazyPupGif: {
    botPrompt: 'https://media.giphy.com/media/gWJ4RVT29gg6Y/giphy.gif',
    type: RTypes.MEDIA,
    answers: [
      {
        nextId: 'allergies',
      },
    ],
  },
  moderatePup: {
    botPrompt: 'Sounds like a snuggle partner! Almost done now moving on to the details',
    answers: [
      { nextId: 'moderatePupGif' },
    ],
  },
  moderatePupGif: {
    botPrompt: 'https://media.giphy.com/media/3o85xD8p86gMTzWPQs/giphy.gif',
    type: RTypes.MEDIA,
    answers: [
      {
        nextId: 'allergies',
      },
    ],
  },
  averagePup: {
    botPrompt: 'Likes to run and then rest, great! Almost done now moving on to the details',
    answers: [
      { nextId: 'averagePupGif' },
    ],
  },
  averagePupGif: {
    botPrompt: 'https://media.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.gif',
    type: RTypes.MEDIA,
    answers: [
      {
        nextId: 'allergies',
      },
    ],
  },
  athleticPup: {
    botPrompt: 'An active one, perfect! Almost done now moving on to the details',
    answers: [
      { nextId: 'athleticPupGif' },
    ],
  },
  athleticPupGif: {
    botPrompt: 'https://media.giphy.com/media/1BfPOEWEgEelBJ0mBv/giphy.gif',
    type: RTypes.MEDIA,
    answers: [
      {
        nextId: 'allergies',
      },
    ],
  },
  allergies: {
    botPrompt: 'Does @varName have any allergies?',
    varName: 'companyName',
    input: selectField(['Yes', 'No']),
    type: RTypes.TRANSFORMED_TEXT,
    answers: [
      {
        answer: 'Yes',
        nextId: 'selectAllAllergies',
      },
      {
        answer: 'No',
        nextId: 'thankYou',
      },
    ],
  },
  selectAllAllergies: {
    botPrompt: 'Poor @varName! Select known allergies.',
    varName: 'companyName',
    input: tagsField(['Allergy1', 'Allergy2', "Allergy3", 'Allergy4', 'Allergy5', 'Allergy6', 'Allergy7', 'Allergy8']),
    type: RTypes.TRANSFORMED_TEXT,
    answers: [
      { nextId: 'thankYou' },
    ],
  },

  thankYou: {
    botPrompt: 'https://media.giphy.com/media/xULW8v7LtZrgcaGvC0/giphy.gif',
    type: RTypes.MEDIA,
    finishConversation: true,
    answers: [
      {
        nextId: 'check_out1',
      },
    ],
  },
  check_out1: {
    botPrompt: 'Thank you so much for filling out your profile! We will have your custom recommendations ready right now.',
    input: endOfConversation(),
  }
}


export default questions;
