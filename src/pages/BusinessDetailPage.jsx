import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Leaf, Sparkles, Cpu, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BusinessDetailPage() {
  const { vertical } = useParams();
  const { language } = useLanguage();

  const areaDetails = {
    green: {
      themeColor: '#7BAA8D',
      bgColor: '#eaf2ee',
      tag: language === 'fi' ? 'VERTIKAALIVILJELY' : 'VERTICAL AGRI-TECH',
      title: 'STO Green',
      slogan: language === 'fi' ? 'Puhdasta pohjoismaista ravintoa ilman kompromisseja' : 'Purity-focused vertical farming with automated climate control',
      desc: language === 'fi'
        ? 'STO Green edustaa modernin maatalousteknologian kärkeä. Kasvatamme erittäin ravintoainetiheitä versoja suljetussa kiertovesijärjestelmässä ilman kasvinsuojeluaineita tai torjunta-aineita. Pystyviljelymme säästää jopa 95 % vettä verrattuna perinteiseen maatalouteen ja tuottaa satoa vuoden ympäri, täysin sääolosuhteista riippumatta.'
        : 'STO Green represents the pinnacle of modern sustainable agriculture. By controlling the light spectrum, humidity, and nutrients in a sterile vertical cleanroom, we grow microgreens with up to 40x higher nutrient density than mature crops. Our automated climate systems ensure optimal growth parameters, producing fresh, high-vitality greens 365 days a year.',
      ctaText: language === 'fi' ? 'Osta tuoreita versoja' : 'Explore Green Shop',
      ctaLink: '/shop?cat=sto-green',
      icon: <Leaf size={32} style={{ color: '#0F2F24' }} />,
      features: [
        { title: language === 'fi' ? 'Puhdas Laboratorio' : 'Cleanroom Laboratory', desc: language === 'fi' ? 'Vantaan pystyviljelmämme toimii steriilissä luokassa 100.' : 'Grown in a highly controlled, biosecure cleanroom with active HEPA filtration.' },
        { title: language === 'fi' ? 'Optimoitu Valospektri' : 'Custom Light Recipes', desc: language === 'fi' ? 'Valikoitu LED-spektri tehostaa vitamiinien ja antioksidanttien muodostumista.' : 'Our custom LED profiles stimulate extreme vitamin synth and dense flavor profiles.' },
        { title: language === 'fi' ? 'Ympärivuotinen Sato' : 'Year-Round Harvest', desc: language === 'fi' ? 'Pohjoisen säästä riippumaton tuotanto takaa tasaisen laadun 365 päivää vuodessa.' : 'Unbending reliability. Delivering fresh crops regardless of Nordic winter extremes.' }
      ]
    },
    gold: {
      themeColor: '#CAA36D',
      bgColor: '#fcf8f2',
      tag: language === 'fi' ? 'POHJOINEN ELÄMÄNTAPA' : 'NORDIC LIFESTYLE',
      title: 'STO Gold',
      slogan: language === 'fi' ? 'Käsintehtyä ylellisyyttä ja rauhoittavia hetkiä' : 'Hand-poured everyday luxury and mindful sensory design',
      desc: language === 'fi'
        ? 'STO Gold tuo pohjoismaisen luonnon ja rauhan kotiisi. Jokainen kynttilä valetetaan käsin Vantaalla puhtaasta soijavahasta ja luonnollisista eteerisistä öljyistä, tarjoten puhtaan ja tunnelmallisen palamisen. Valikoimaamme kuuluu myös minimalistisia koruja ja sisustustuotteita, jotka on suunniteltu tuomaan arkeen ripauksen luksusta.'
        : 'STO Gold blends premium Nordic design aesthetics with everyday sensory comfort. From artisanal hand-poured soy wax candles to bespoke jewelry pieces, our lifestyle collection is crafted for quiet moments of everyday indulgence. Every candle is poured in small batches using non-toxic ingredients to ensure a soot-free burn.',
      ctaText: language === 'fi' ? 'Selaa valikoimaa' : 'Explore Gold Shop',
      ctaLink: '/shop?cat=sto-gold',
      icon: <Sparkles size={32} style={{ color: '#0F2F24' }} />,
      features: [
        { title: language === 'fi' ? 'Käsinvalettu Vantaalla' : 'Handcrafted in Finland', desc: language === 'fi' ? 'Pienet erät takaavat korkeimman mahdollisen laadun ja tarkkuuden.' : 'Poured in micro-batches with meticulous attention to detail and curing times.' },
        { title: language === 'fi' ? 'Puusydän (Wick)' : 'Natural Wood Wicks', desc: language === 'fi' ? 'Palaessaan puusydän rätisee rauhoittavasti kuin pieni takkatuli.' : 'Crackling organic wood wicks that mimic the cozy acoustic warmth of an open fire.' },
        { title: language === 'fi' ? 'Eteeriset Öljyt' : 'Botanical Aromatherapy', desc: language === 'fi' ? 'Tuoksut pohjautuvat suomalaisen metsän aitoihin kasviuutteisiin.' : 'Scented exclusively with non-toxic, therapeutic-grade botanical oils.' }
      ]
    },
    it: {
      themeColor: '#2b5c8f',
      bgColor: '#eef4f9',
      tag: language === 'fi' ? 'DIGITAALISET JÄRJESTELMÄT' : 'DIGITAL SYSTEMS',
      title: 'STO IT',
      slogan: language === 'fi' ? 'Viljelyautomaatiota ja moderneja digitaalisia arkkitehtuureja' : 'Agri-Tech integration and premium full-stack software systems',
      desc: language === 'fi'
        ? 'STO IT on digitaalinen sydämemme. Suunnittelemme ja kehitämme pystyviljelymme ohjausjärjestelmät (IoT) itse. Tarjoamme myös korkealaatuista ohjelmistokehityskonsultointia ja pilviarkkitehtuuriratkaisuja valituille kumppaneille, auttaen heitä skaalaamaan palvelunsa globaalille tasolle.'
        : 'STO IT bridges agricultural hardware and high-performance software. We custom-engineer the automated climate control, sensory feedback networks, and digital logistics that power STO Green. Additionally, we provide bespoke technology consulting and full-stack software development for enterprise partners worldwide.',
      ctaText: language === 'fi' ? 'Aloita konsultaatio' : 'Request IT Consult',
      ctaLink: '/contact?subject=it',
      icon: <Cpu size={32} style={{ color: '#0F2F24' }} />,
      features: [
        { title: language === 'fi' ? 'Viljelyautomaatio (IoT)' : 'Agri-Tech Automation', desc: language === 'fi' ? 'Ohjelmistomme lukee anturitietoja ja säätää valoa sekä kastelua mikrosekunneissa.' : 'Sub-second feedback loops monitoring automated nutrient feeds, light spectrums, and moisture.' },
        { title: language === 'fi' ? 'Huippuluokan Web-Kehitys' : 'Enterprise Software', desc: language === 'fi' ? 'Kehitämme erittäin nopeita, turvallisia ja skaalautuvia web-alustoja.' : 'Specializing in secure cloud database architecture, automated deployment pipelines, and custom APIs.' },
        { title: language === 'fi' ? 'Agile-konsultointi' : 'Elite Technical Consulting', desc: language === 'fi' ? 'Autamme yrityksiä suunnittelemaan ja modernisoimaan heidän digitaalisia palveluitaan.' : 'Helping startups and scale-ups architect clean, robust, and maintainable software stacks.' }
      ]
    }
  };

  const details = areaDetails[vertical] || areaDetails.green;

  const renderInteractiveShowcase = () => {
    if (vertical === 'green') {
      return (
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#7BAA8D', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7BAA8D', display: 'inline-block' }} />
              {language === 'fi' ? 'AUTOMAATIO AKTIVINEN' : 'AGRI-TECH TELEMETRY'}
            </span>
            <span style={{ fontSize: '11px', color: '#9a9a9a' }}>v2.4.1</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Metric 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#6b6b6b' }}>{language === 'fi' ? 'Lämpötila' : 'Temperature'}</span>
                <span style={{ fontWeight: 600, color: '#0F2F24' }}>21.8 °C</span>
              </div>
              <div style={{ height: '6px', background: '#eae7e1', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: '#7BAA8D', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#6b6b6b' }}>{language === 'fi' ? 'Kosteus' : 'Humidity'}</span>
                <span style={{ fontWeight: 600, color: '#0F2F24' }}>64.5%</span>
              </div>
              <div style={{ height: '6px', background: '#eae7e1', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '64%', height: '100%', background: '#7BAA8D', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#6b6b6b' }}>{language === 'fi' ? 'Ravinneliuos pH' : 'Nutrient pH'}</span>
                <span style={{ fontWeight: 600, color: '#0F2F24' }}>5.8 pH</span>
              </div>
              <div style={{ height: '6px', background: '#eae7e1', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '58%', height: '100%', background: '#7BAA8D', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Metric 4 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                <span style={{ color: '#6b6b6b' }}>{language === 'fi' ? 'Valoteho (PPFD)' : 'Light Intensity (PPFD)'}</span>
                <span style={{ fontWeight: 600, color: '#0F2F24' }}>920 μmol/m²/s</span>
              </div>
              <div style={{ height: '6px', background: '#eae7e1', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '82%', height: '100%', background: '#7BAA8D', borderRadius: '3px' }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '28px', padding: '16px', background: '#eaf2ee', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '20px' }}>🌱</span>
            <span style={{ fontSize: '12px', color: '#1a4a3a', lineHeight: 1.4 }}>
              {language === 'fi' 
                ? 'Viljelykaappi säätelee optimaaliset olosuhteet automaattisesti 5 minuutin välein tehdyillä korjauksilla.'
                : 'Automated climate controls adjust nutrient dosage and light recipes continuously for optimized yield.'}
            </span>
          </div>
        </div>
      );
    }

    if (vertical === 'gold') {
      return (
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#CAA36D', display: 'flex', alignItems: 'center', gap: '6px' }}>
              ✦ {language === 'fi' ? 'TUOKSUPROFIILIT' : 'NORDIC AROMAS'}
            </span>
            <span style={{ fontSize: '11px', color: '#9a9a9a' }}>{language === 'fi' ? 'Käsintehty' : '100% Pure Soy'}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Scent 1 */}
            <div style={{ padding: '12px 16px', background: '#ffffff', borderRadius: '16px', border: '1px solid #eae7e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#0F2F24', fontSize: '14px' }}>Havu (Spruce & Pine)</span>
                <span style={{ fontSize: '12px', color: '#CAA36D' }}>{language === 'fi' ? 'Metsäinen' : 'Earthy'}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#6b6b6b' }}>
                {language === 'fi' ? 'Männynneulaset, kuusenkerkkä, kostea sammal' : 'Pine needles, spruce shoots, woodland moss'}
              </div>
            </div>

            {/* Scent 2 */}
            <div style={{ padding: '12px 16px', background: '#ffffff', borderRadius: '16px', border: '1px solid #eae7e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#0F2F24', fontSize: '14px' }}>Kaste (Nordic Rain)</span>
                <span style={{ fontSize: '12px', color: '#CAA36D' }}>{language === 'fi' ? 'Raikas' : 'Fresh'}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#6b6b6b' }}>
                {language === 'fi' ? 'Aamukaste, koivunlehdet, villiminttu' : 'Morning dew, silver birch leaves, wild field mint'}
              </div>
            </div>

            {/* Scent 3 */}
            <div style={{ padding: '12px 16px', background: '#ffffff', borderRadius: '16px', border: '1px solid #eae7e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#0F2F24', fontSize: '14px' }}>Tuli (Woodfire Smoke)</span>
                <span style={{ fontSize: '12px', color: '#CAA36D' }}>{language === 'fi' ? 'Lämmin' : 'Cozy'}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#6b6b6b' }}>
                {language === 'fi' ? 'Savupuu, kuiva koivu, pehmeä meripihka' : 'Smoked cedar, birchwood crackle, soft warm amber'}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ textAlign: 'left', background: '#0F2F24', padding: '24px', borderRadius: '16px', fontFamily: 'monospace', color: '#a8c9b5', fontSize: '12px', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
            <span>sto_climate_iot.py</span>
            <span style={{ color: '#CAA36D' }}>● active</span>
          </div>
          <div style={{ color: '#ffffff', marginBottom: '4px' }}>
            <span style={{ color: '#e0c068' }}>class</span> <span style={{ color: '#6ba0cf' }}>ClimateManager</span>:
          </div>
          <div style={{ paddingLeft: '16px', color: 'rgba(255,255,255,0.75)' }}>
            <div><span style={{ color: '#e0c068' }}>def</span> <span style={{ color: '#e08868' }}>__init__</span>(self, target_humidity=0.65):</div>
            <div style={{ paddingLeft: '16px' }}>self.target_h = target_humidity</div>
            <div style={{ paddingLeft: '16px' }}>self.led_power = 920 # PPFD</div>
            <br />
            <div><span style={{ color: '#e0c068' }}>def</span> <span style={{ color: '#6ba0cf' }}>adjust_climate</span>(self, sensor_data):</div>
            <div style={{ paddingLeft: '16px' }}>
              <span style={{ color: '#cf6baf' }}>if</span> sensor_data[<span style={{ color: '#a8c9b5' }}>"humidity"</span>] &gt; 0.68:
            </div>
            <div style={{ paddingLeft: '32px', color: '#7BAA8D' }}>self.activate_ventilation(speed=1.5)</div>
            <div style={{ paddingLeft: '16px' }}>
              <span style={{ color: '#cf6baf' }}>elif</span> sensor_data[<span style={{ color: '#a8c9b5' }}>"ppfd"</span>] &lt; 900:
            </div>
            <div style={{ paddingLeft: '32px', color: '#7BAA8D' }}>self.boost_leds(factor=1.12)</div>
          </div>
        </div>
        
        <div style={{ color: '#7BAA8D', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px', fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
          <span>&gt; sys.run_telemetry()</span>
          <span style={{ color: '#ffffff' }}>[OK]</span>
        </div>
      </div>
    );
  };

  return (
    <main style={{ paddingTop: '100px', background: '#FAFAF8', minHeight: '100vh', paddingBottom: '80px' }}>
      <div className="container">
        {/* Back Link */}
        <Link 
          to="/about" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#6b6b6b', 
            fontSize: '14px', 
            fontWeight: 500, 
            marginBottom: '32px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#0F2F24'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#6b6b6b'}
        >
          <ArrowLeft size={16} />
          <span>{language === 'fi' ? 'Takaisin Meistä-sivulle' : 'Back to About'}</span>
        </Link>

        {/* Immersive Detail Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#ffffff',
            border: '1px solid #eae7e1',
            borderRadius: '32px',
            padding: '60px 48px',
            boxShadow: '0 24px 60px rgba(15, 47, 36, 0.03)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: '64px',
            alignItems: 'center'
          }}
          className="mobile-stack"
        >
          {/* Left Column: Comprehensive details */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '12px', 
                background: details.bgColor, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {details.icon}
              </div>
              <span style={{ 
                color: details.themeColor, 
                fontSize: '12px', 
                fontWeight: 600, 
                letterSpacing: '0.15em', 
                textTransform: 'uppercase',
                fontFamily: "'Inter', sans-serif"
              }}>
                {details.tag}
              </span>
            </div>

            <h1 style={{ 
              fontFamily: "'Cormorant Garamond', serif", 
              fontSize: '3rem', 
              color: '#0F2F24', 
              fontWeight: 300, 
              lineHeight: 1.1,
              margin: '0 0 16px 0' 
            }}>
              {details.title}
            </h1>

            <h4 style={{ 
              fontSize: '16px', 
              color: '#0F2F24', 
              fontWeight: 500, 
              marginBottom: '24px',
              lineHeight: 1.5,
              fontFamily: "'Inter', sans-serif" 
            }}>
              {details.slogan}
            </h4>

            <p style={{ 
              color: '#6b6b6b', 
              fontSize: '15px', 
              lineHeight: 1.8, 
              marginBottom: '40px' 
            }}>
              {details.desc}
            </p>

            {/* Key Capabilities */}
            <h5 style={{ 
              fontSize: '11px', 
              fontWeight: 600, 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase', 
              color: '#0F2F24', 
              marginBottom: '24px',
              fontFamily: "'Inter', sans-serif"
            }}>
              {language === 'fi' ? 'Palvelumme Avainominaisuudet' : 'Key Area Capabilities'}
            </h5>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px', width: '100%' }}>
              {details.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <CheckCircle size={18} style={{ color: details.themeColor, marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: '#0F2F24' }}>{f.title}</div>
                    <div style={{ fontSize: '13.5px', color: '#6b6b6b', marginTop: '4px', lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              to={details.ctaLink} 
              className="btn"
              style={{
                background: '#0F2F24',
                color: '#ffffff',
                padding: '14px 40px',
                borderRadius: '8px',
                fontWeight: 500,
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 14px rgba(15, 47, 36, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = details.themeColor;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0F2F24';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>{details.ctaText}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Column: Visual Showcase Panel */}
          <div style={{
            background: '#FAFAF9',
            border: '1px solid #eae7e1',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.01)',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            {renderInteractiveShowcase()}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
