function createCrack(startX, startY, angle) {
    const crack = document.createElement('div');
    crack.classList.add('ice-crack');
  
    // Randomize crack length (within a range)
    crack.style.height = `${Math.floor(Math.random() * 100) + 50}px`;
  
    // Set initial position and rotation based on arguments
    crack.style.transform = `translate(${startX}px, ${startY}px) rotate(${angle}deg)`;
  
    return crack;
  }
  
  function generateCracks(containerElement, numCracks) {
    // Generate multiple cracks at random positions and angles
    for (let i = 0; i < numCracks; i++) {
      const randomX = Math.floor(Math.random() * containerElement.clientWidth); // Limit X within container width
      const randomY = Math.floor(Math.random() * containerElement.clientHeight-260); // Limit Y within container height
      const randomAngle = Math.floor(Math.random() * 360); // Random rotation (0-360 deg)
      const crackElement = createCrack(randomX, randomY, randomAngle);
      containerElement.appendChild(crackElement);
    }
  }
  
  window.onload = function() {
    const iceContainer = document.querySelector('.ice-container');
    if (iceContainer) {
      generateCracks(iceContainer, 200); // Adjust for desired number of cracks
    } else {
      console.error("Element with class '.ice-container' not found!");
    }
  };
  