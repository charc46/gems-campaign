import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import gemPic from '../public/gemma.jpg'

import * as cheerio from 'cheerio'
import * as axios from 'axios'

export default function Home({ gemAmount, morAmount, runAmount, petitionData }) {
  const petition = petitionData.data !== undefined ? `${petitionData.data.attributes.signature_count} signatures` : 'Petition data not available, please try again soon!'
  return (
    <div className={styles.container}>
      <Head>
        <title>Do it for Gem</title>
        <meta name='description' content='Help Gemma raise the funds she needs for immunotherapy treatment for stage 4 cervical cancer' />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className={styles.main}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Gemma Willis</h1>
          <h2 className={styles.subtitle}>17/11/1990 - 21/10/2021</h2>
          <div className={styles.image}>
            <Image src={gemPic} alt="Gemma, my angel" layout='responsive' />
          </div>
          <p>It is with a broken heart that we share with you that after 20 months of fighting cervical cancer Gemma passed away peacefully on Thursday 21st October 2021.</p>
          <p>The cancer was spreading aggressively and had gone to her brain. Chemo was stopped as it wasn’t working and we were told the NHS couldn’t do anything else for her. </p>
          <p>Private Immunotherapy was still an option but Gemma had been poorly and had to strengthen up again to face the treatment….unfortunately she couldn’t find the strength to fight anymore.</p>
          <p>We would like to thank everyone from the bottom of our hearts who donated to help give Gemma the chance to have the Immunotherapy treatment.</p>
          <p>We will be updating again in a few weeks when we have laid Gemma to rest about how we will use the funds raised in Gemma’s memory.</p>
          <h2>Celebrating Gemma's life</h2>
          <p>Gemma’s ‘Celebration of Life’ will be held on Wednesday 3rd November</p>
          <div className={styles.serviceDetails}>
            <p>Service: 13:00 UK time</p>
            <address>
              GreenAcres Epping Forest, Kiln Road,<br/>
              North Weald, Epping,<br/>
              Essex, CM16 6AD
            </address>
          </div>
          <br/>
          <div className={styles.serviceDetails}>
            <p>Wake: 14:30</p>
            <address>
              The Top Oak,<br/>
              Oakhill Rd, Stapleford Abbotts,<br/>
              Essex, RM4 1JL
            </address>
          </div>
          <p><strong>Please send Floral Tributes to Green Acres.</strong></p>

          <p>The service will be livestreamed for those who can't make it in person.</p>
          <p>LiveStream Link & Password: </p>
          <a href="https://watch.obitus.com" target='blank' rel='noreferrer' className={styles.serviceLink}>https://watch.obitus.com</a>
          <div className={styles.streamDetails}>
            <p>Username: losi3812</p>
            <p>Password: 560062</p>
          </div>

          <p><strong>Please keep signing and sharing the petition to get immunotherapy for cervical cancer funded by the NHS.</strong></p>
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
              <p>{petition}</p>
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
          gemAmount: gemAmount || 'Goal progress unavailable, please try again soon!',
          morAmount: morAmount || 'Goal progress unavailable, please try again soon!',
          runAmount: runAmount || 'Goal progress unavailable, please try again soon!',
          petitionData: petitionData || 'Petition data unavailable, please try again soon!'
        }
      }
    } catch(e) {
      console.log(e);
      return {
        props: {
          gemAmount: 'Goal progress unavailable, please try again soon!',
          morAmount: 'Goal progress unavailable, please try again soon!',
          runAmount: 'Goal progress unavailable, please try again soon!',
          petitionData: 'Petition data unavailable, please try again soon!'
        }
      }
    }
  }