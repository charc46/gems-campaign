import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import gemPic from '../public/gemma.jpg'

import * as cheerio from 'cheerio'
import * as axios from 'axios'

export default function Home({ gemAmount, morAmount, runAmount, petitionData }) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Help save Gemma’s life</title>
          <meta name='description' content='Help Gemma raise the funds she needs for immunotherapy treatment for stage 4 cervical cancer' />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <main className={styles.main}>
          <div className={styles.intro}>
            <h1 className={styles.title}>Help save Gemma’s life.</h1>
            <div className={styles.image}>
              <Image src={gemPic} alt="Gemma over the past year" layout='intrinsic' />
              <p className={styles.caption}>Always smiling</p>
            </div>
            <p>Super Yacht Stewardess Gemma has just been told that the NHS can no longer help her as the chemo is not working. She will remain in hospital until she is able to raise enough funds to start private treatments.</p>
            <p>Gem wants to remind everyone to please encourage the women in your life to get regular Pap smears. She showed no signs of cervical cancer before her bi-annual exam. This agressive cancer has now spread to her liver, muscles around her spine and brain.</p>
            <p>The caring people in Gemmas life have set up various fundraising pages which are detailed below. Please donate if you can and if you are not able to then please share Gemmas story and this page.</p>
            <p>Thank you.</p>
            <div className={styles.video}>
              <h4>Gemma being presented the Senior Crew award at this years A Crew awards in Barcelona.</h4>
              <iframe src="https://www.youtube.com/embed/sluc1FLz9R4?start=5257" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
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
                <h2 className={styles.cardTitle}>GoFundMe page set up by Superyacht Stews pledging to run 100k throughout October:</h2>
                <p>Several superyacht industry stewardesses have set themselves a goal of running 100k throughout the month of october to help raise funds for Gemma&apos;s treatment.</p>
                <p>{runAmount}</p>
                <a href="https://www.gofundme.com/f/100k-in-october-to-help-gem-beat-cervical-cancer" target="blank" rel='noreferrer' className={styles.link}>Donate</a>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>Petition:</h2>
                <p>Petition for the UK Government to discuss in parliament for immunotherapy treatment for cervical cancer to be funded by the NHS.</p>
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