/**
 * Applies deltas to the current game state properties, respecting boundaries (0-100).
 * @param {Object} currentState - { PI, SI, SH, WT, BD }
 * @param {Object} adjustedDeltas - The deltas to apply after propagation modifications
 * @returns {Object} New state
 */
export const applyScoreDeltas = (currentState, adjustedDeltas) => {
  const clamp = (val) => Math.floor(Math.min(100, Math.max(0, val)));

  return {
    PI: clamp(currentState.PI + (adjustedDeltas.PI || 0)),
    SI: clamp(currentState.SI + (adjustedDeltas.SI || 0)),
    SH: clamp(currentState.SH + (adjustedDeltas.SH || 0)),
    WT: clamp(currentState.WT + (adjustedDeltas.WT || 0)),
    BD: clamp(currentState.BD + (adjustedDeltas.BD || 0)),
  };
};

/**
 * Calculates final game score
 * @param {number} PI 
 * @param {number} SI 
 * @returns {Object} { finalScore, balanceBonus }
 */
export const calculateFinalScore = (PI, SI) => {
  const baseScore = (0.4 * PI) + (0.6 * SI);
  const balanceBonus = Math.max(0, 10 - Math.abs(PI - SI)) * 0.5;
  
  return {
    finalScore: Math.floor(baseScore + balanceBonus),
    balanceBonus,
  };
};
