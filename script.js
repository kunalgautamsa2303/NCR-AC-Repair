(function(){
  const year=document.querySelector('[data-year]'); if(year) year.textContent=new Date().getFullYear();
  const form=document.getElementById('bookingForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const fd=new FormData(form);
      const name=(fd.get('name')||'').toString().trim();
      const phone=(fd.get('phone')||'').toString().trim();
      const city=(fd.get('city')||'').toString();
      const service=(fd.get('service')||'').toString();
      const address=(fd.get('address')||'').toString().trim();
      if(!name || !/^[0-9]{10}$/.test(phone) || !city || !service){alert('Please enter your name, a valid 10-digit mobile number, city and service.');return;}
      const msg=`Hello NCR AC Home Service,\n\nI want to book an AC service.\nName: ${name}\nMobile: ${phone}\nCity: ${city}\nService: ${service}\nAddress/Landmark: ${address||'Not provided'}`;
      window.open('https://wa.me/919756572466?text='+encodeURIComponent(msg),'_blank','noopener');
    });
  }
})();
