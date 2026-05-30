/* -------------------------------------------------------------
   HOME / DASHBOARD SPECIFIC INTERACTIVE SCRIPTS (Tharun R Portfolio)
   Maintains role carousels, stat counters, and dynamic live activity updates
   ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Role Carousel Typing/Rotation Animation
  const roleItems = document.querySelectorAll('.role-item');
  const carousel = document.querySelector('.role-carousel');
  let currentRoleIdx = 1; // Start at 1 since index 0 is active in HTML
  
  if (roleItems.length > 0 && carousel) {
    const rotateRoles = () => {
      // Toggle active states
      roleItems.forEach((item, idx) => {
        if (idx === currentRoleIdx) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      // Rotate index
      currentRoleIdx = (currentRoleIdx + 1) % roleItems.length;
    };
    
    // Rotate every 3 seconds
    setInterval(rotateRoles, 3000);
  }

  // 2. Stat Counter Animation
  const statNumbers = document.querySelectorAll('.stat-num');
  
  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 2000; // 2 seconds animation
      const startTime = performance.now();
      
      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        const currentValue = Math.floor(easeProgress * target);
        
        stat.innerText = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.innerText = target;
        }
      };
      
      requestAnimationFrame(updateCount);
    });
  };

  // Trigger counters when stats enter view
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }

  // 3. Dynamic Visual Updates on the Mockup Cards (Real-time Feel)
  // Simulate live background telemetry or activities like the dashboard attached
  const activityItems = document.querySelector('.activity-items');
  const activities = [
    { text: "Built CodeSentinel DP Platform", dot: "blue" },
    { text: "AMD x LabLab.ai Hackathon", dot: "green" },
    { text: "Updated Cloud DevOps Pipeline", dot: "purple" },
    { text: "IBM Watsonx.ai Hackathon", dot: "blue" },
    { text: "SDE Intern @ BlueStocks", dot: "purple" },
    { text: "AR Virtual Try-On deployed", dot: "green" }
  ];
  
  if (activityItems) {
    setInterval(() => {
      // Pick random activity
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      
      // Fade out last item, insert new one at top
      const lastChild = activityItems.lastElementChild;
      if (lastChild) {
        lastChild.style.opacity = '0';
        lastChild.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          lastChild.remove();
          
          const newItem = document.createElement('div');
          newItem.className = 'activity-item';
          newItem.style.opacity = '0';
          newItem.style.transform = 'translateY(-10px)';
          newItem.style.transition = 'all 0.5s ease';
          
          newItem.innerHTML = `
            <span class="activity-dot ${randomActivity.dot}"></span>
            <span>${randomActivity.text}</span>
          `;
          
          activityItems.insertBefore(newItem, activityItems.firstChild);
          
          // Trigger reflow & animate in
          setTimeout(() => {
            newItem.style.opacity = '1';
            newItem.style.transform = 'translateY(0)';
          }, 50);
          
        }, 500);
      }
    }, 5000); // update feed every 5 seconds
  }
});
