const phData = [
  // NOTE: This is a representative sample, as the full data of all provinces, cities, and barangays of the Philippines is extremely large (over 42,000 barangays).
  // For a real application, consider loading this data from a database or a JSON file.
  // Below is a more comprehensive, but still partial, list for demonstration.

  {
    province: 'Abra',
    cities: [
      {
        city: 'Bangued',
        barangays: [
          'Angad', 'Agtangao', 'Bangbangar', 'Calaba', 'Cabuloan', 'Calot', 'Consiliman', 'Dangdangla', 'Lingtan', 'Lipcan', 'Macray', 'Mudiit', 'Narnara', 'Patucannay', 'Poblacion', 'Sagap', 'San Antonio', 'San Isidro', 'San Juan', 'San Lorenzo', 'San Marcial', 'San Pedro', 'Sao-atan', 'Zone 1', 'Zone 2', 'Zone 3', 'Zone 4'
        ]
      }
    ]
  },
  {
    province: 'Agusan del Norte',
    cities: [
      {
        city: 'Butuan City',
        barangays: [
          'Ampayon', 'Ambago', 'Anticala', 'Baan Km 3', 'Baan Riverside', 'Bading', 'Bancasi', 'Baobaoan', 'Bayanihan', 'Bit-os', 'Bonbon', 'Bugabus', 'Buhangin', 'Cabcabon', 'Camayahan', 'De Oro', 'Dulag', 'Dumalagan', 'Golden Ribbon', 'Kinamlutan', 'Lemon', 'Libertad', 'Lumbocan', 'Mahay', 'Mahogany', 'Mambatangan', 'Manapa', 'Pagatpatan', 'Pianing', 'Pinamanculan', 'Salvacion', 'San Mateo', 'San Vicente', 'Sankanan', 'Sumilihon', 'Tagabaca', 'Taguibo', 'Taligaman', 'Tiniwisan', 'Tungao', 'Villa Kananga', 'Villa Rosario'
        ]
      }
    ]
  },
  {
    province: 'Albay',
    cities: [
      {
        city: 'Legazpi City',
        barangays: [
          'Albay District', 'Bagumbayan', 'Banquerohan', 'Bgy 1', 'Bgy 2', 'Bgy 3', 'Bgy 4', 'Bgy 5', 'Bgy 6', 'Bgy 7', 'Bgy 8', 'Bgy 9', 'Bgy 10', 'Bgy 11', 'Bgy 12', 'Bgy 13', 'Bgy 14', 'Bgy 15', 'Bgy 16', 'Bgy 17', 'Bgy 18', 'Bgy 19', 'Bgy 20', 'Bgy 21', 'Bgy 22', 'Bgy 23', 'Bgy 24', 'Bgy 25', 'Bgy 26', 'Bgy 27', 'Bgy 28', 'Bgy 29', 'Bgy 30', 'Bgy 31', 'Bgy 32', 'Bgy 33', 'Bgy 34', 'Bgy 35', 'Bgy 36', 'Bgy 37', 'Bgy 38', 'Bgy 39', 'Bgy 40', 'Bgy 41', 'Bgy 42', 'Bgy 43', 'Bgy 44', 'Bgy 45'
        ]
      }
    ]
  },
  {
    province: 'Benguet',
    cities: [
      {
        city: 'Baguio City',
        barangays: [
          'Abanao-Zandueta-Kayong-Chugum-Otek', 'A. Bonifacio-Caguioa-Rimando', 'Ambiong', 'Andres Bonifacio (Lower Bokawkan)', 'Asin Road', 'Atok Trail', 'Aurora Hill Proper (Malvar-Sgt. Floresca)', 'Aurora Hill, South Central', 'Aurora Hill, North Central', 'Bagong Lipunan', 'Bakakeng Central', 'Bakakeng North', 'Balsigan', 'Bayan Park East', 'Bayan Park Village', 'Bayan Park West', 'Brookside', 'Brookspoint', 'Burnham-Legarda', 'Cabinet Hill-Teachers Camp', 'Camdas Subdivision', 'Camp 7', 'Camp 8', 'Campo Filipino', 'City Camp Central', 'City Camp Proper', 'Country Club Village', 'Cresencia Village', 'Dagsian, Lower', 'Dagsian, Upper', 'Dizon Subdivision', 'Dominican Hill-Mirador', 'Dontogan', 'Engineers\' Hill', 'Fairview', 'Ferdinand (Happy Homes-Campo Sioco)', 'Fort del Pilar', 'Gabriela Silang', 'General Emilio F. Aguinaldo', 'General Luna, Upper', 'General Luna, Lower', 'Gibraltar', 'Greenwater Village', 'Harrison-Claudio Carantes', 'Hillside', 'Holy Ghost Extension', 'Holy Ghost Proper', 'Honeymoon (Honeymoon-Holy Ghost)', 'Imelda R. Marcos (La Salle)', 'Imelda Village', 'Irisan', 'Kabayanihan', 'Kias', 'Legarda-Burnham-Kisad', 'Liwanag-Loakan', 'Loakan-Apugan', 'Loakan Proper', 'Lower Quirino-Magsaysay', 'Lualhati', 'Lucnab', 'Lourdes Extension', 'Lourdes Subdivision, Lower', 'Lourdes Subdivision, Proper', 'Lourdes Subdivision, Upper', 'Magsaysay Private Road', 'Magsaysay, Upper', 'Malcolm Square-Perfecto (Jose Abad Santos)', 'Manuel A. Roxas', 'Market Subdivision', 'Middle Quirino Hill', 'Military Cut-off', 'Modern Site, East', 'Modern Site, West', 'Montinola Subdivision', 'Moog', 'New Lucban', 'Outlook Drive', 'Pacdal', 'Padre Burgos', 'Padre Zamora', 'Palma-Urbano (Cariño-Palma)', 'Phil-Am', 'Pinget', 'Poliwes', 'Quirino Hill, East', 'Quirino Hill, West', 'Quirino-Magsaysay, Upper', 'Quezon Hill, Proper', 'Quezon Hill, Upper', 'Quezon Hill, Lower', 'Rizal Monument Area', 'Rock Quarry, Lower', 'Rock Quarry, Middle', 'Rock Quarry, Upper', 'Saint Joseph Village', 'Salud Mitra', 'San Antonio Village', 'San Luis Village', 'San Roque Village', 'San Vicente', 'Santo Niño-Slaughter', 'Santo Tomas Proper', 'Scout Barrio', 'Session Road Area', 'SLU-SVP Housing Village', 'South Drive', 'St. Joseph Village', 'Sto. Tomas School Area', 'Teodora Alonzo', 'Trancoville', 'Victoria Village', 'Villa Maria', 'West Quirino Hill'
        ]
      }
    ]
  },
  {
    province: 'Cebu',
    cities: [
      {
        city: 'Cebu City',
        barangays: [
          'Adlaon', 'Agsungot', 'Apas', 'Babag', 'Bacayan', 'Banilad', 'Basak Pardo', 'Basak San Nicolas', 'Binaliw', 'Bonbon', 'Budlaan', 'Buhisan', 'Bulacao', 'Busay', 'Calamba', 'Cambinocot', 'Capitol Site', 'Carreta', 'Cogon Pardo', 'Cogon Ramos', 'Day-as', 'Duljo Fatima', 'Ermita', 'Guba', 'Guadalupe', 'Hipodromo', 'Inayawan', 'Kalubihan', 'Kamputhaw', 'Kasambagan', 'Kinasang-an Pardo', 'Labangon', 'Lahug', 'Lorega San Miguel', 'Lusaran', 'Luz', 'Mabini', 'Mabolo', 'Malubog', 'Mambaling', 'Pahina Central', 'Pahina San Nicolas', 'Pahina Tres', 'Pamutan', 'Parian', 'Paril', 'Pasil', 'Pit-os', 'Poblacion Pardo', 'Pulangbato', 'Punta Princesa', 'Quiot', 'Sambag I', 'Sambag II', 'San Antonio', 'San Jose', 'San Nicolas Proper', 'San Roque', 'Santa Cruz', 'Santo Niño', 'Sawang Calero', 'Sinsin', 'Sirao', 'Suba', 'Sudlon I', 'Sudlon II', 'Tabunan', 'Tagbao', 'Talamban', 'Taptap', 'Tejero', 'Tinago', 'Tisa', 'To-ong', 'Zapatera'
        ]
      },
      {
        city: 'Mandaue',
        barangays: [
          'Alang-Alang', 'Bakilid', 'Banilad', 'Basak', 'Cabancalan', 'Cambaro', 'Canduman', 'Casili', 'Casuntingan', 'Centro', 'Cubacub', 'Guizo', 'Jagobiao', 'Labogon', 'Looc', 'Maguikay', 'Mantuyong', 'Opao', 'Pakna-an', 'Pagsabungan', 'Subangdaku', 'Tabok', 'Tawason', 'Tingub', 'Tipolo', 'Umapad'
        ]
      },
      {
        city: 'Lapu-Lapu City',
        barangays: [
          'Agus', 'Babag', 'Bankal', 'Baring', 'Basak', 'Buaya', 'Calawisan', 'Canjulao', 'Caubian', 'Caw-oy', 'Gun-ob', 'Ibo', 'Looc', 'Mactan', 'Maribago', 'Marigondon', 'Pajo', 'Pangan-an', 'Poblacion', 'Punta Engaño', 'Pusok', 'Sabang', 'Santa Rosa', 'Subabasbas', 'Talima', 'Tingo'
        ]
      }
    ]
  },
  {
    province: 'Davao del Sur',
    cities: [
      {
        city: 'Davao City',
        barangays: [
          'Agdao', 'Baguio', 'Buhangin', 'Bunawan', 'Calinan', 'Davao', 'Marilog', 'Paquibato', 'Poblacion', 'Talomo', 'Toril', 'Tugbok'
        ]
      },
      // Davao Oriental cities and barangays
      {
        city: 'Mati City',
        barangays: [
          'Badas', 'Bobon', 'Buso', 'Cabuaya', 'Central', 'Culian', 'Dahican', 'Dawan', 'Don Enrique Lopez', 'Don Martin Marundan', 'Libudon', 'Luban', 'Macambol', 'Mamali', 'Matiao', 'Sainz', 'Tagabakid', 'Tagbinonga', 'Tamisan'
        ]
      },
      {
        city: 'Baganga',
        barangays: [
          'Baculin', 'Ban-ao', 'Batiano', 'Bobonao', 'Campawan', 'Central', 'Dapnan', 'Kinablangan', 'Lambajon', 'Lucod', 'Mahan-ub', 'Mikit', 'Salingcomot', 'San Isidro', 'San Victor', 'Saoquegue', 'Sison', 'Suz-on'
        ]
      },
      {
        city: 'Banaybanay',
        barangays: [
          'Cabangcalan', 'Caganganan', 'Piso', 'Punta Linao', 'San Isidro', 'San Vicente', 'Poblacion', 'Panikian', 'Mogbongcogon', 'Maputi', 'Mahayag', 'Calubihan', 'Dapnan'
        ]
      },
      {
        city: 'Boston',
        barangays: [
          'Cabasagan', 'Carmen', 'Cawayanan', 'Poblacion', 'San Jose', 'Sibajay', 'Caatihan'
        ]
      },
      {
        city: 'Caraga',
        barangays: [
          'Alvar', 'Ayang', 'P.M. Sobrecarey', 'San Antonio', 'San Luis', 'San Miguel', 'San Pedro', 'San Vicente', 'Santa Fe', 'Santiago', 'Santo Rosario', 'Poblacion'
        ]
      },
      {
        city: 'Cateel',
        barangays: [
          'Alegria', 'Aliwagwag', 'Aragon', 'Baybay', 'Bongloy', 'Don Enrique Lopez', 'Kinablangan', 'Mainit', 'Malibago', 'San Alfonso', 'San Antonio', 'San Miguel', 'San Rafael', 'San Vicente', 'Santa Filomena', 'Taytayan', 'Poblacion'
        ]
      },
      {
        city: 'Governor Generoso',
        barangays: [
          'Anitap', 'Bangkal', 'Batu-Batu', 'Cabagayan', 'Don Mariano Marcos', 'Lavigan', 'Macambol', 'Magdug', 'Mahan-ub', 'Pundaguitan', 'Surop', 'Tibanban', 'Tiblawan'
        ]
      },
      {
        city: 'Lupon',
        barangays: [
          'Bagumbayan', 'Cocornon', 'Don Mariano Marcos', 'Ilocano', 'Lantawan', 'Langka', 'Limbahan', 'Luzon', 'Macangao', 'Magsaysay', 'Maragatas', 'New Visayas', 'Poblacion', 'San Isidro', 'San Pedro', 'Tagboa'
        ]
      },
      {
        city: 'Manay',
        barangays: [
          'Baon', 'Bitaogan', 'Central', 'Del Pilar', 'Guza', 'Holy Cross', 'Lambog', 'Old Macopa', 'San Fermin', 'San Ignacio', 'San Isidro', 'San Jose', 'San Vicente', 'Taocanga', 'Zaragoza'
        ]
      },
      {
        city: 'Tarragona',
        barangays: [
          'Cabagayan', 'Central', 'Dadong', 'Dapnan', 'Limot', 'Lucatan', 'Maganda', 'Ompao', 'Tomoaong'
        ]
      },
      {
        city: 'Digos City',
        barangays: [
          'Aplaya', 'Balabag', 'Binaton', 'Cogon', 'Dawis', 'Dulangan', 'Goma', 'Igpit', 'Kiagot', 'Lapu-Lapu', 'Matti', 'Rizal', 'Ruparan', 'San Agustin', 'San Jose', 'San Roque', 'Sinawilan', 'Soong', 'Tiguman', 'Tres de Mayo'
        ]
      }
    ]
  },
  {
    province: 'Iloilo',
    cities: [
      {
        city: 'Iloilo City',
        barangays: [
          'Arevalo', 'City Proper', 'Jaro', 'La Paz', 'Lapuz', 'Mandurriao', 'Molo'
        ]
      },
      {
        city: 'Passi City',
        barangays: [
          'Agdahon', 'Agtabo', 'Agutayan', 'Aglalana', 'Agtambo', 'Alimono', 'Batuan', 'Bitaogan', 'Bungcol', 'Cabunga', 'Calamigan', 'Calinog', 'Dalicanan', 'Gemumua-Agahon', 'Gines', 'Imbang Grande', 'Imbang Pequeño', 'Jaguimitan', 'Jalugban', 'Man-it', 'Pangi', 'Quintin Salas', 'Salngan', 'Sarapan', 'Tabucbuc', 'Tabucan', 'Tabugon', 'Talongonan', 'Tigum', 'Tubod', 'Vista Alegre'
        ]
      }
    ]
  },
  {
    province: 'Pampanga',
    cities: [
      {
        city: 'San Fernando',
        barangays: [
          'Alasas', 'Baliti', 'Bulaon', 'Calulut', 'Dela Paz Norte', 'Dela Paz Sur', 'Del Carmen', 'Del Pilar', 'Del Rosario', 'Dolores', 'Juliana', 'Lara', 'Maimpis', 'Malino', 'Malpitic', 'Pandaras', 'Panipuan', 'San Agustin', 'San Felipe', 'San Isidro', 'San Jose', 'San Juan', 'San Nicolas', 'San Pedro', 'Santa Lucia', 'Santa Teresita', 'Santo Niño', 'Sindalan', 'Siran', 'Sto. Rosario', 'Telabastagan'
        ]
      },
      {
        city: 'Angeles City',
        barangays: [
          'Agapito del Rosario', 'Amsic', 'Anunas', 'Balibago', 'Capaya', 'Claro M. Recto', 'Cuayan', 'Cutcut', 'Cutud', 'Lourdes North West', 'Lourdes Sur', 'Lourdes Sur East', 'Malabanias', 'Margot', 'Mining', 'Pampang', 'Pandan', 'Pulungbulu', 'Pulung Cacutud', 'Pulung Maragul', 'Pulung Santol', 'Salapungan', 'San Jose', 'San Nicolas', 'Santa Teresita', 'Santo Cristo', 'Santo Domingo', 'Santo Rosario', 'Sapangbato', 'Sapang Maisac', 'Tabun', 'Virgen delos Remedios'
        ]
      }
    ]
  },
  {
    province: 'Metro Manila',
    cities: [
      {
        city: 'Manila',
        barangays: [
          'Binondo', 'Ermita', 'Malate', 'Paco', 'Pandacan', 'Port Area', 'Quiapo', 'Sampaloc', 'San Andres', 'San Miguel', 'San Nicolas', 'Santa Ana', 'Santa Cruz', 'Santa Mesa', 'Tondo'
        ]
      },
      {
        city: 'Quezon City',
        barangays: [
          'Bagong Silangan', 'Batasan Hills', 'Commonwealth', 'Fairview', 'Kamuning', 'Katipunan', 'Project 2 & 3', 'Cubao', 'Novaliches', 'Tandang Sora', 'Sauyo', 'Talipapa', 'Bagbag', 'Gulod', 'San Bartolome', 'San Agustin', 'Santa Monica', 'Pasong Tamo', 'Payatas'
        ]
      },
      {
        city: 'Makati',
        barangays: [
          'Bangkal', 'Bel-Air', 'Cembo', 'Comembo', 'Dasmariñas', 'East Rembo', 'Forbes Park', 'Guadalupe Nuevo', 'Guadalupe Viejo', 'Kasilawan', 'La Paz', 'Magallanes', 'Olympia', 'Palanan', 'Pembo', 'Pinagkaisahan', 'Pio del Pilar', 'Poblacion', 'Post Proper Northside', 'Post Proper Southside', 'Rizal', 'San Antonio', 'San Isidro', 'San Lorenzo', 'Santa Cruz', 'Singkamas', 'South Cembo', 'Tejeros', 'Urdaneta', 'Valenzuela', 'West Rembo'
        ]
      },
      {
        city: 'Taguig',
        barangays: [
          'Bagumbayan', 'Bambang', 'Calzada', 'Central Bicutan', 'Central Signal Village', 'Fort Bonifacio', 'Hagonoy', 'Ibayo-Tipas', 'Ligid-Tipas', 'Lower Bicutan', 'Maharlika Village', 'Napindan', 'New Lower Bicutan', 'Palingon', 'Pinagsama', 'San Miguel', 'Santa Ana', 'South Daang Hari', 'South Signal Village', 'Tanyag', 'Tuktukan', 'Upper Bicutan', 'Ususan', 'Wawa', 'Western Bicutan'
        ]
      },
      {
        city: 'Pasig',
        barangays: [
          'Bagong Ilog', 'Bagong Katipunan', 'Bambang', 'Buting', 'Caniogan', 'Dela Paz', 'Kalawaan', 'Kapitolyo', 'Malinao', 'Manggahan', 'Maybunga', 'Oranbo', 'Palatiw', 'Pinagbuhatan', 'Pineda', 'Rosario', 'Sagad', 'San Antonio', 'San Joaquin', 'San Jose', 'San Miguel', 'San Nicolas', 'Santa Cruz', 'Santa Lucia', 'Santo Tomas', 'Sumilang', 'Ugong'
        ]
      }
    ]
  }
];

export default phData; 