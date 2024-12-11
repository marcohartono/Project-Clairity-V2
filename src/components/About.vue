<template>
  <section class="about-section">
    <div class="content-wrapper">
      <div class="text-section">
        <h2>Why We Measure Air Quality</h2>
        <p class="subtitle">Essential Reasons for EQI Monitoring</p>
      </div>
      <div class="reasons-section">
        <div class="reason">
          <div class="icon-wrapper">
            <span class="icon">👥</span>
          </div>
          <div class="text-wrapper">
            <h3>Raising Awareness</h3>
            <p>
              Public access to AQI information allows people to make informed decisions about their daily activities, such as reducing outdoor exercise during high pollution days, thereby minimizing health risks.
            </p>
          </div>
        </div>
        <div class="reason">
          <div class="icon-wrapper">
            <span class="icon">📍</span>
          </div>
          <div class="text-wrapper">
            <h3>Tracking Pollution Sources</h3>
            <p>
              Regular monitoring of AQI can help identify major pollution sources, such as traffic, industrial emissions, or natural events like wildfires. This information is crucial for developing targeted strategies to reduce pollution at the source.
            </p>
          </div>
        </div>
        <div class="reason">
          <div class="icon-wrapper">
            <span class="icon">⚖️</span>
          </div>
          <div class="text-wrapper">
            <h3>Informing Policy Decisions</h3>
            <p>
              AQI data supports the creation and enforcement of air quality regulations. Policymakers rely on accurate AQI measurements to set standards for allowable pollutant levels and evaluate the effectiveness of environmental policies.
            </p>
          </div>
        </div>
      </div>
    
      <div class="about-project">
        <h2>About Us: Project Cl(air)ity</h2>
        <p>
          At Project Cl(air)ity, we believe that a clean and healthy environment is essential for productivity, well-being, and overall quality of life. Our mission is to revolutionize how we monitor and respond to indoor air quality by combining cutting-edge technology with actionable insights. By providing real-time data on CO2 levels, PM2.5, humidity, and temperature, our air quality sensors empower individuals and organizations to create healthier workspaces.
        </p>
        <p>
          My name is Marco Hartono, and I’m a high school student with a passion for tackling environmental challenges through technology and innovation. This project started as a way to address a problem I noticed in my own surroundings: the lack of awareness about indoor air quality and its impact on well-being and productivity.
        </p>
        <h3>Why I Started This Project</h3>
        <p>
          Living in a city with air quality challenges, I realized that while outdoor pollution often grabs the headlines, indoor air quality is equally critical but often overlooked. Whether in classrooms, offices, or homes, the air we breathe directly affects our focus, mood, and health. I wanted to create a solution that not only monitors air quality but also provides actionable insights to improve it.
        </p>
        <h3>Acknowledging the Team</h3>
        <p>
          While this project began as a personal idea, it has grown with the invaluable support of the LIT Team from Polytron. Their expertise and guidance helped me bring my vision to life, from refining sensor technology to optimizing data analysis methods. Working alongside such a talented and experienced team has been both an inspiring and humbling experience, and I’m deeply grateful for their mentorship and collaboration.
        </p>
        <ul>
          <li>Hardware Engineer - Nova S</li>
          <li>Firmware Engineer - Labriyantoko K</li>
          <li>Firmware Engineer - Ferio AM</li>
          <li>Backend Engineer - Wildan A</li>
          <li>UI/UX Engineer - Laili R</li>
          <li>Frontend Engineer - Michael RK</li>
        </ul>
        <p>Supporting staff:</p>
        <ul>
          <li>Jihaan NA</li>
          <li>Edwin CL</li>
        </ul>
        <h3>What We Do</h3>
        <ul>
          <li><strong>Real-Time Monitoring:</strong> Our sensors provide accurate, up-to-the-minute data on key air quality metrics, ensuring you’re always informed about your environment.</li>
          <li><strong>Interactive Feedback:</strong> Users can share their experiences and mood through our web platform, helping us analyze the correlation between air quality and work productivity.</li>
          <li><strong>Data-Driven Insights:</strong> We transform raw data into meaningful reports, identifying trends, anomalies, and actionable recommendations to optimize indoor spaces.</li>
        </ul>
        <h3>Why It Matters</h3>
        <p>
          In today's world, where indoor spaces play a crucial role in our daily lives, poor air quality often goes unnoticed. Research shows that factors like high CO2 levels and particulate matter can negatively impact focus, mood, and overall health. With Project Cl(air)ity, we aim to raise awareness and provide tools to make informed decisions, ensuring every breath you take is a step towards a healthier you.
        </p>
        <h3>Our Vision</h3>
        <p>
          Our goal is to create a world where every workspace, classroom, and home prioritizes air quality as a fundamental aspect of well-being. By leveraging technology, fostering collaboration, and engaging with communities, we envision a future where indoor spaces support both health and productivity.
        </p>
        <h3>Join Us</h3>
        <p>
          We’re more than just a technology project; we’re a movement for change. Whether you’re a business owner looking to improve employee well-being or an individual passionate about creating a healthier living space, we invite you to join us in making a difference.
        </p>
        <p>
          Together, let’s breathe easy and work smarter with Project Cl(air)ity.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AirQualityReasons",
};
</script>

<style scoped>
.about-section {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.text-section {
  color: #2f855a;
  font-weight: bold;
  text-align: center;
}

.text-section h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.reasons-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.reason {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.icon-wrapper {
  background-color: #c6f6d5;
  color: #2f855a;
  padding: 15px;
  border-radius: 50%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-wrapper h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
}

.text-wrapper p {
  color: #4a5568;
  font-size: 1rem;
}

.team-section {
  text-align: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.team-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.team-image {
  background-color: #c6f6d5;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 0 auto 10px;
}

.team-card h3 {
  font-size: 1rem;
  color: #2f855a;
  margin-bottom: 5px;
}

.team-card p {
  font-size: 0.9rem;
  color: #4a5568;
}

.about-project {
  margin-top: 20px;
}

.about-project h2 {
  font-size: 1.5rem;
  color: #2f855a;
  margin-bottom: 10px;
}

.about-project h3 {
  font-size: 1.2rem;
  color: #2f855a;
  margin-top: 15px;
}

.about-project p {
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 10px;
}

.about-project ul {
  list-style-type: none;
  padding: 0;
  margin: 0 0 10px 0;
}

.about-project ul li {
  color: #4a5568;
  font-size: 1rem;
  margin-bottom: 5px;
}
</style>
