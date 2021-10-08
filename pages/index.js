import styles from '../styles/Home.module.css'

import * as cheerio from 'cheerio'
import * as axios from 'axios'

export default function Home({ gemAmount, morAmount, runAmount, petitionData }) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Helping Gemma fight cervical cancer</h1>
            <p>Various ways to help Gemma get her treatment!</p>
            <p>Gemma is currently having her second round of chemotherapy to treat stage 4 cervical cancer. However if the treatment does not work the only other option for her is immunotherapy which currently is not covered on the NHS for Gemmas cancer. The immunotherapy she would need is £10,000 per treatment and she will need an absolute minimum of 4 treatments and up to 30.</p>
            <p>The caring people in Gemmas life have set up various fundraising pages which are detailed below. Please donate if you can and if you are not able to then please share Gemmas story and this page.</p>
            <p>Thank you</p>
          </div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>GoFundMe page set up by Gemma Hulbert:</h2>
                <p>Gemma and Gemma met through yachting and have become close friends. Gemma is using her social influence as <a href="https://www.instagram.com/theyachtstew/" target='blank' rel='noreferrer'>@theyachtstew</a> to help Gemma raise the funds she needs.</p>
                <p>{gemAmount}</p>
                <a href="https://www.gofundme.com/f/help-gem-beat-cancer" target="blank" rel='noreferrer' className={styles.link}>Donate</a>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>GoFundMe page set up by Morgan Bradshaw and Bar Fifteen Loughton: </h2>
                <p>Gemma spent some time working in Bar Fifteen (now Quindici) in her local Loughton High Street where she made lifelong friends who have taken it upon themselves to help Gemma raise the funds she needs.</p>
                <p>{morAmount}</p>
                <a href="https://www.gofundme.com/f/help-save-fifteens-gemma" target="blank" rel='noreferrer' className={styles.link}>Donate</a>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>GoFundMe page set up by Superyacht Stews pleding to run 100k throughout October:</h2>
                <p>Several superyacht industry stewardesses have set themselves a goal of running 100k throughout the month of october to help raise funds for Gemma&apos;s treatment.</p>
                <p>{runAmount}</p>
                <a href="https://www.gofundme.com/f/100k-in-october-to-help-gem-beat-cervical-cancer" target="blank" rel='noreferrer' className={styles.link}>Donate</a>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>Petition:</h2>
                <p>Petition for the UK Government to discuss in parliament for immunotherapy treatment for cervical cancer to be funded by the NHS</p>
                <p>{petitionData.data.attributes.signature_count} signatures</p>
                <a href="https://petition.parliament.uk/petitions/598472" target="blank" rel='noreferrer' className={styles.link}>Sign</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

export const getServerSideProps = async () => {
    try {
      const gemData = await axios.get('https://www.gofundme.com/f/help-gem-beat-cancer')
      const morData = await axios.get('https://www.gofundme.com/f/help-save-fifteens-gemma')
      const runData = await axios.get('https://www.gofundme.com/f/100k-in-october-to-help-gem-beat-cervical-cancer')
      const petitionRaw = await axios.get('https://petition.parliament.uk/petitions/598472.json')
      const petitionData = petitionRaw.data

      const gemHtml = cheerio.load(gemData.data)
      const morHtml = cheerio.load(morData.data)
      const runHtml = cheerio.load(runData.data)

      const gemAmount = gemHtml('h2.m-progress-meter-heading').text()
      const morAmount = morHtml('h2.m-progress-meter-heading').text()
      const runAmount = runHtml('h2.m-progress-meter-heading').text()

      return {
        props: {
          gemAmount,
          morAmount,
          runAmount,
          petitionData
        }
      }
    } catch(e) {
      console.log(e);
    }
  }