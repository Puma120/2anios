// Complete flower animation with all elements
document.addEventListener('DOMContentLoaded', function() {
    // Set initial visibility for main container
    gsap.set('#Footer_group_1_', {opacity: 1});
    
    // Create timeline with comprehensive animations
    var tl = gsap.timeline();
    
    // Phase 1: Main stems and initial flowers
    tl.fromTo(['#Stem16_1_','#Stem1_1_'], 
        {opacity: 0}, 
        {duration: 1.5, opacity: 1}, 
        0
    );
    
    // Main flowers
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
    
    // Phase 2: Secondary stems and flowers
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
    
    // Phase 3: All remaining stems
    var allStems = [
        '#Stem2_1_', '#Stem3_1_', '#Stem4_1_', '#Stem5a_1_', '#Stem5b_1_', 
        '#Stem6_1_', '#Stem7a_1_', '#Stem7b_1_', '#Stem7c_1_', '#Stem8_1_',
        '#Stem17_1_', '#Stem18_1_', '#Stem19_1_', '#Stem20a_1_', '#Stem20b_1_', 
        '#Stem21_1_', '#Stem22a_1_', '#Stem22b_1_', '#Stem22c_1_', '#Stem23_1_',
        '#Stem10_1_', '#Stem11_1_', '#Stem12a_1_', '#Stem12b_1_',
        '#Stem26_1_', '#Stem27_1_', '#Stem28a_1_', '#Stem28b_1_',
        '#Stem13a_1_', '#Stem13b_1_', '#Stem13c_1_',
        '#Stem29a_1_', '#Stem29b_1_', '#Stem29c_1_'
    ];
    
    allStems.forEach((stem, index) => {
        tl.fromTo(stem, 
            {opacity: 0}, 
            {duration: 1, opacity: 1}, 
            1.5 + (index * 0.1)
        );
    });
    
    // Phase 4: All leaves
    var allLeaves = [
        '#Leaf2_1_', '#Leaf17_1_', '#Leaf4_1_', '#Leaf5a_1_', '#Leaf5b_1_',
        '#Leaf19_1_', '#Leaf20a_1_', '#Leaf20b_1_', '#Leaf11_1_', '#Leaf12a_1_', 
        '#Leaf12b_1_', '#Leaf27_1_', '#Leaf28a_1_', '#Leaf28b_1_', '#Leaf13a_1_',
        '#Leaf13b_1_', '#Leaf13c_1_', '#Leaf29a_1_', '#Leaf29b_1_', '#Leaf29c_1_'
    ];
    
    allLeaves.forEach((leaf, index) => {
        tl.fromTo(leaf, 
            {opacity: 0, scale: 0}, 
            {duration: 1, opacity: 1, scale: 1}, 
            2.5 + (index * 0.15)
        );
    });
    
    // Phase 5: All buds and bud groups
    var allBuds = [
        '#Bud3_1_', '#Bud6_1_', '#Bud18_1_', '#Bud21_1_', '#Bud7a_1_', 
        '#Bud7b_1_', '#Bud7c_1_', '#Bud8_1_', '#Bud22a_1_', '#Bud22b_1_', 
        '#Bud22c_1_', '#Bud23_1_', '#Bud10_1_', '#Bud26_1_',
        '#BudGroup3_1_', '#BudGroup6_1_', '#BudGroup7a_1_', '#BudGroup7b_1_',
        '#BudGroup7c_1_', '#BudGroup8_1_', '#BudGroup18_1_', '#BudGroup21_1_',
        '#BudGroup22a_1_', '#BudGroup22b_1_', '#BudGroup22c_1_', '#BudGroup23_1_',
        '#BudGroup10_1_', '#BudGroup26_1_'
    ];
    
    allBuds.forEach((bud, index) => {
        tl.fromTo(bud, 
            {opacity: 0, scale: 0}, 
            {duration: 1, opacity: 1, scale: 1}, 
            4 + (index * 0.2)
        );
    });
    
    // Phase 6: All stroke elements (decorative lines)
    var allStrokes = [
        '#Stroke30f_1_', '#Stroke30e_1_', '#Stroke30d_3_1_', '#Stroke30d_2_1_', '#Stroke30d_1_1_',
        '#Stroke30c_2_1_', '#Stroke30c_1_1_', '#Stroke30b_1_', '#Stroke30a_1_',
        '#Stroke24g_2_1_', '#Stroke24g_1_1_', '#Stroke24f_1_', '#Stroke24e_2_1_', '#Stroke24e_1_1_',
        '#Stroke24d_1_', '#Stroke24c_1_', '#Stroke24b_2_1_', '#Stroke24b_1_1_', '#Stroke24a_1_',
        '#Stroke15f_1_', '#Stroke15e_1_', '#Stroke15d_3_1_', '#Stroke15d_2_1_', '#Stroke15d_1_1_',
        '#Stroke15c_2_1_', '#Stroke15c_1_1_', '#Stroke15b_1_', '#Stroke15a_1_',
        '#Stroke14g_2_1_', '#Stroke14g_1_1_', '#Stroke14f_1_', '#Stroke14e_2_1_', '#Stroke14e_1_1_',
        '#Stroke14d_1_', '#Stroke14c_1_', '#Stroke14b_2_1_', '#Stroke14b_1_1_', '#Stroke14a_1_'
    ];
    
    allStrokes.forEach((stroke, index) => {
        tl.fromTo(stroke, 
            {opacity: 0}, 
            {duration: 0.8, opacity: 1}, 
            5 + (index * 0.1)
        );
    });
    
    // Phase 7: Additional flower parts
    var flowerParts = [
        '#BackPetals25_1_', '#Pollen25_1_', '#FrontPetals25_1_', '#Back25_1_', '#Lines25_1_',
        '#BackPetals16_1_', '#Pollen16_1_', '#FrontPetals16_1_', '#Back16_1_', '#Lines16_1_',
        '#BackPetals9_1_', '#Pollen9_1_', '#FrontPetals9_1_', '#Back9_1_', '#Lines9_1_',
        '#BackPetals1_1_', '#Pollen1_1_', '#FrontPetals1_1_', '#Back1_1_', '#Lines1_1_'
    ];
    
    flowerParts.forEach((part, index) => {
        tl.fromTo(part, 
            {opacity: 0}, 
            {duration: 0.5, opacity: 1}, 
            3 + (index * 0.1)
        );
    });
    
    // Phase 8: Final decorative elements
    tl.fromTo('#Dots_1_', 
        {opacity: 0, scale: 0}, 
        {duration: 2, opacity: 1, scale: 1}, 
        8
    );
    
    // Flourish if it exists
    tl.fromTo('#Flourish_1_', 
        {opacity: 0}, 
        {duration: 1.5, opacity: 1}, 
        8.5
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