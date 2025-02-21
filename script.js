
const gridItems = document.querySelectorAll('.gridItems');


gridItems.forEach(item => {
    const img = item.querySelector('img'); 

    
    item.addEventListener('mouseenter', () => {
        img.style.transition = 'none'; 
        item.addEventListener('mousemove', moveImage);
    });

   
    item.addEventListener('mouseleave', () => {
        img.style.transition = 'transform 0.5s ease-in'; 
        img.style.transform = 'translate(0, 0)'; 
        item.removeEventListener('mousemove', moveImage);
    });

    
    function moveImage(e) {
        
        const rect = item.getBoundingClientRect();

        
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        
        img.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
});