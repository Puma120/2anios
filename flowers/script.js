// Simple flower animation with basic GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Set initial visibility
    gsap.set('#Footer_group_1_', {opacity: 1});
    
    // Create timeline with simple animations
    var tl = gsap.timeline();
    
    // Animate main stems first
    tl.fromTo(['#Stem16_1_','#Stem1_1_'], 
        {opacity: 0}, 
        {duration: 1.5, opacity: 1}, 
        0
    );
    
    // Animate flowers appearing
    tl.fromTo(['#BaseGroup16_1_', '#BaseGroup1_1_'], 
        {opacity: 0, scale: 0}, 
        {duration: 1, opacity: 1, scale: 1}, 
        1
    );
    
    tl.fromTo(['#PinkFlowerGroup16_1_', '#PinkFlowerGroup1_1_'], 
        {opacity: 0, scale: 0}, 
        {duration: 2, opacity: 1, scale: 1}, 
        1.2
    );
    
    // Secondary stems and flowers
    tl.fromTo(['#Stem9_1_','#Stem25_1_'], 
        {opacity: 0}, 
        {duration: 2, opacity: 1}, 
        2
    );
    
    tl.fromTo(['#BaseGroup9_1_', '#BaseGroup25_1_'], 
        {opacity: 0, scale: 0}, 
        {duration: 1, opacity: 1, scale: 1}, 
        3
    );
    
    tl.fromTo(['#PinkFlowerGroup9_1_', '#PinkFlowerGroup25_1_'], 
        {opacity: 0, scale: 0}, 
        {duration: 2, opacity: 1, scale: 1}, 
        3.2
    );
    
    // Animate leaves
    var leafElements = [
        '#Leaf2_1_', '#Leaf17_1_', '#Leaf4_1_', '#Leaf5a_1_', '#Leaf5b_1_',
        '#Leaf19_1_', '#Leaf20a_1_', '#Leaf20b_1_', '#Leaf11_1_', '#Leaf12a_1_', 
        '#Leaf12b_1_', '#Leaf27_1_', '#Leaf28a_1_', '#Leaf28b_1_', '#Leaf13a_1_',
        '#Leaf13b_1_', '#Leaf13c_1_', '#Leaf29a_1_', '#Leaf29b_1_', '#Leaf29c_1_'
    ];
    
    leafElements.forEach((leaf, index) => {
        tl.fromTo(leaf, 
            {opacity: 0, scale: 0}, 
            {duration: 1, opacity: 1, scale: 1}, 
            2 + (index * 0.2)
        );
    });
    
    // Animate buds
    var budElements = [
        '#Bud3_1_', '#Bud6_1_', '#Bud18_1_', '#Bud21_1_', '#Bud7a_1_', 
        '#Bud7b_1_', '#Bud7c_1_', '#Bud8_1_', '#Bud22a_1_', '#Bud22b_1_', 
        '#Bud22c_1_', '#Bud23_1_', '#Bud10_1_', '#Bud26_1_'
    ];
    
    budElements.forEach((bud, index) => {
        tl.fromTo(bud, 
            {opacity: 0, scale: 0}, 
            {duration: 1, opacity: 1, scale: 1}, 
            3 + (index * 0.3)
        );
    });
    
    // Animate stems
    var stemElements = [
        '#Stem2_1_', '#Stem3_1_', '#Stem4_1_', '#Stem5a_1_', '#Stem5b_1_', 
        '#Stem6_1_', '#Stem7a_1_', '#Stem7b_1_', '#Stem7c_1_', '#Stem8_1_',
        '#Stem17_1_', '#Stem18_1_', '#Stem19_1_', '#Stem20a_1_', '#Stem20b_1_', 
        '#Stem21_1_', '#Stem22a_1_', '#Stem22b_1_', '#Stem22c_1_', '#Stem23_1_',
        '#Stem10_1_', '#Stem11_1_', '#Stem12a_1_', '#Stem12b_1_',
        '#Stem26_1_', '#Stem27_1_', '#Stem28a_1_', '#Stem28b_1_',
        '#Stem13a_1_', '#Stem13b_1_', '#Stem13c_1_',
        '#Stem29a_1_', '#Stem29b_1_', '#Stem29c_1_'
    ];
    
    stemElements.forEach((stem, index) => {
        tl.fromTo(stem, 
            {opacity: 0}, 
            {duration: 1, opacity: 1}, 
            1 + (index * 0.1)
        );
    });
    
    // Animate dots at the end
    tl.fromTo('#Dots_1_', 
        {opacity: 0, scale: 0}, 
        {duration: 2, opacity: 1, scale: 1}, 
        6
    );
});

// Función para abrir la carta
function openLetter() {
  const letterButton = document.getElementById('letter-button');
  const loveLetter = document.getElementById('love-letter');
  
  // Ocultar el botón del sobre con animación
  letterButton.style.transform = 'translate(-50%, -50%) scale(0)';
  letterButton.style.opacity = '0';
  
  // Después de la animación, ocultar completamente el botón y mostrar la carta
  setTimeout(() => {
    letterButton.style.display = 'none';
    loveLetter.style.display = 'block';
    loveLetter.style.opacity = '0';
    loveLetter.style.transform = 'translate(-50%, -50%) scale(0.5)';
    
    // Animar la aparición de la carta
    setTimeout(() => {
      loveLetter.style.transition = 'all 0.5s ease';
      loveLetter.style.opacity = '1';
      loveLetter.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);
  }, 300);
}

// Función para cerrar la carta y navegar a los fuegos artificiales
function closeLetter() {
  window.location.href = '../fireworks/index.html';
}