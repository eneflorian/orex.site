const axios = require('axios');

async function testOLXScraper() {
  console.log('🔍 Testez scraperul OLX local...\n');
  
  try {
    // Test cu mock data
    console.log('1. Test cu mock data:');
    const mockResponse = await axios.get('http://localhost:3000/api/anunturi?mock=true&oras=sibiu');
    console.log(`✅ Mock data: ${mockResponse.data.total} anunțuri`);
    console.log(`📊 Statistici: Preț mediu ${mockResponse.data.statistici.pretMediu} lei\n`);
    
    // Test cu scraping real (dacă serverul rulează)
    console.log('2. Test cu scraping real:');
    const realResponse = await axios.get('http://localhost:3000/api/anunturi?oras=sibiu&categorie=imobiliare', {
      timeout: 30000 // 30 secunde timeout pentru scraping
    });
    
    console.log(`✅ Scraping real: ${realResponse.data.total} anunțuri`);
    console.log(`📊 Sursă: ${realResponse.data.metadata.source}`);
    console.log(`🕐 Timestamp: ${realResponse.data.metadata.timestamp}`);
    
    if (realResponse.data.anunturi.length > 0) {
      const firstAd = realResponse.data.anunturi[0];
      console.log(`📋 Primul anunț: ${firstAd.titlu}`);
      console.log(`💰 Preț: ${firstAd.pret} ${firstAd.valuta}`);
      console.log(`📍 Locație: ${firstAd.locatie}`);
      console.log(`🔗 URL: ${firstAd.url}\n`);
    }
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('❌ Serverul local nu rulează. Pornește cu: npm run dev');
    } else {
      console.log('❌ Eroare la testare:', error.message);
    }
  }
}

testOLXScraper();