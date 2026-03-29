/**
 * Based on the player's history of choices and current state, modifies the base deltas.
 *
 * `choice` structure in JSON:
 * {
 *   "id": "flood_irrigation",
 *   "baseDeltas": { "PI": 15, "SI": -15, "WT": -25 },
 *   "modifiers": [
 *     {
 *       "condition": { "type": "history", "choiceId": "deep_tilling" },
 *       "effect": { "SI": -15 } // additional penalty
 *     },
 *     {
 *       "condition": { "type": "stat", "stat": "SH", "operator": ">", "value": 60 },
 *       "effect": { "PI": 5 }
 *     }
 *   ]
 * }
 * 
 * @param {Object} choiceData - From stages.json choices definition
 * @param {Array<Object>} history - Array of previous {stageId, choice}
 * @param {Object} currentState - {PI, SI, SH, WT, BD}
 * @returns {Object} adjustedDeltas {PI, SI, SH, WT, BD}
 */
export const calculateAdjustedDeltas = (choiceData, history, currentState) => {
  const adjustedDeltas = {
    PI: choiceData.baseDeltas?.PI || 0,
    SI: choiceData.baseDeltas?.SI || 0,
    SH: choiceData.baseDeltas?.SH || 0,
    WT: choiceData.baseDeltas?.WT || 0,
    BD: choiceData.baseDeltas?.BD || 0,
  };

  const choiceHistoryIds = history.map(h => h.choice);

  if (choiceData.modifiers) {
    choiceData.modifiers.forEach((modifier) => {
      let conditionMet = false;

      if (modifier.condition.type === "history") {
        conditionMet = choiceHistoryIds.includes(modifier.condition.choiceId);
      } else if (modifier.condition.type === "stat") {
        const statValue = currentState[modifier.condition.stat];
        const targetValue = modifier.condition.value;
        
        switch (modifier.condition.operator) {
          case ">": conditionMet = statValue > targetValue; break;
          case "<": conditionMet = statValue < targetValue; break;
          case ">=": conditionMet = statValue >= targetValue; break;
          case "<=": conditionMet = statValue <= targetValue; break;
          case "==": conditionMet = statValue === targetValue; break;
        }
      }

      if (conditionMet) {
        if (modifier.effect.PI) adjustedDeltas.PI += modifier.effect.PI;
        if (modifier.effect.SI) adjustedDeltas.SI += modifier.effect.SI;
        if (modifier.effect.SH) adjustedDeltas.SH += modifier.effect.SH;
        if (modifier.effect.WT) adjustedDeltas.WT += modifier.effect.WT;
        if (modifier.effect.BD) adjustedDeltas.BD += modifier.effect.BD;
      }
    });
  }

  return adjustedDeltas;
};

/**
 * Validates if a choice is available based on history
 * @param {Object} choiceData 
 * @param {Array} history
 */
export const isChoiceAvailable = (choiceData, history) => {
  if (!choiceData.requirements) return true;
  
  const choiceHistoryIds = history.map(h => h.choice);
  
  // Ex: "requirements": { "history": ["soil_test"] }
  if (choiceData.requirements.history) {
    const hasRequired = choiceData.requirements.history.every(reqId => 
      choiceHistoryIds.includes(reqId)
    );
    if (!hasRequired) return false;
  }
  
  return true;
};
