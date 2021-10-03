export const initResponses = (User) => {
  return {
    PHASE_INTRO: [
      "Hi " + User + ", you will get through this moment.",
      "I am here to guide you.",
      "Would you like to do a visualization or a sensory exercise? ",
    ],
    PHASE_VISUALIZATION: [
      [
        "Ok. X, let’s go to a different place together, a more peaceful place. ",
        "Imagine that you are at a lake, the waters are calm, and the current is mild. ",
        "You can feel a light breeze blowing by you. In this place, what do you hear?  ",
      ],
      [
        "Yes, let’s think about the day.",
        "It is a warm day, comfortable but not hot at all, nearing sunset. ",
        "The place you are sitting lets you see the whole landscape around you, gentle rolling hills.",
        "What colors do you see around you? ",
      ],
      [
        "Now that we are here, lets do a breathing exercise together. ",
        "Imagine you are sitting by the lake.",
        "You can still hear the water rippling around you.",
        "Are you ready to take some deep breaths. ",
      ],
    ],
  };
};
