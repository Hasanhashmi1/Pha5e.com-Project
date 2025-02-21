const gridItems = document.querySelectorAll('.gridContOne, .gridContTwo');
const textElements = document.querySelectorAll('.innerText span');
const dummyImageUrl = 'https://res.cloudinary.com/dj5stvxl3/image/upload/v1740155370/border-removebg-preview_bvo4p0.png';

textElements.forEach(text => {
    text.dataset.originalContent = text.textContent;
});

gridItems.forEach(item => {
    const img = item.querySelector('img');
    img.dataset.originalSrc = img.src;
    let isDragging = false;
    const maxDistance = 50;

    item.addEventListener('mouseenter', (e) => {
        img.style.transition = 'none';
        isDragging = true;
        
        gridItems.forEach(otherItem => {
            if(otherItem !== item) {
                otherItem.querySelector('img').src = dummyImageUrl;
            }
        });

        textElements.forEach(text => {
            text.style.webkitTextStroke = '2px white'; 
            text.style.color = 'transparent'; 
            text.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mousemove', moveImage);
    });

    item.addEventListener('mouseleave', () => {
        isDragging = false;
        img.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        img.style.transform = 'translate(0, 0)';
        
        gridItems.forEach(otherItem => {
            otherItem.querySelector('img').src = otherItem.querySelector('img').dataset.originalSrc;
        });

        textElements.forEach(text => {
            text.style.webkitTextStroke = '0px transparent';
            text.style.color = 'white';
        });

        item.removeEventListener('mousemove', moveImage);
    });

    function moveImage(e) {
        if(!isDragging) return;
        
        const rect = item.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const mouseX = (e.clientX - rect.left - centerX) * 0.2;
        const mouseY = (e.clientY - rect.top - centerY) * 0.2;
        
        img.style.transform = `translate(
            ${Math.min(maxDistance, Math.max(-maxDistance, mouseX))}px,
            ${Math.min(maxDistance, Math.max(-maxDistance, mouseY))}px
        )`;
    }
});