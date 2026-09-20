import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    id: '01',
    type: 'COMMITTEE WORK',
    title: 'Editorial Committee Member',
    organization: 'IEEE Student Branch',
    university: 'University of Sri Jayewardenepura',
    description:
      'Contributed to editorial and communication activities within the IEEE Student Branch, supporting content and community initiatives.',
    tags: ['Editorial', 'Communication', 'Teamwork'],
    linkedin:
      'https://www.linkedin.com/posts/gagana-prasad-565ba6266_ieee-usj-ieeesb-activity-7466191921074606082-6mqj',
    side: 'left',
  },
  {
    id: '02',
    type: 'PROJECT EXPERIENCE',
    title: 'EXPEDITION',
    role: 'Finance Team Member',
    organization: 'IEEE Student Branch',
    university: 'University of Sri Jayewardenepura',
    description:
      'Contributed as a member of the finance team for the EXPEDITION project, supporting the team throughout the initiative.',
    tags: ['Finance', 'Planning', 'Teamwork'],
    linkedin:
      'https://www.linkedin.com/posts/gagana-prasad-565ba6266_ieee-usj-ieeesb-activity-7489304716125052928-ORMI',
    side: 'right',
  },
  {
    id: '03',
    type: 'PROJECT LEADERSHIP',
    title: 'Career Gateway 1.0',
    role: 'Design Team Head',
    organization: 'IEEE Student Branch',
    university: 'University of Sri Jayewardenepura',
    description:
      'Led the design team for Career Gateway 1.0, coordinating design work and contributing to the visual direction of the project.',
    tags: ['Leadership', 'Design', 'Team Management'],
    linkedin:
      'https://www.linkedin.com/posts/gagana-prasad-565ba6266_ieee-usj-ieeesb-activity-7501827377153380352-ybrB',
    side: 'left',
  },
  {
    id: '04',
    type: 'RECOGNITION',
    title: 'Volunteer of the Month',
    organization: 'IEEE Student Branch',
    university: 'University of Sri Jayewardenepura',
    description:
      'Recognized as Volunteer of the Month for active contribution and involvement within the IEEE Student Branch community.',
    tags: ['Recognition', 'Community', 'Contribution'],
    linkedin:
      'https://www.linkedin.com/posts/gagana-prasad-565ba6266_ieee-ieeesb-usj-activity-7492293953367703552-hwNz',
    side: 'right',
  },
]

function ExperienceCard({ item, index, started }) {
  const itemRef = useRef(null)
  const [mobileActive, setMobileActive] = useState(false)

  useEffect(() => {
    const element = itemRef.current
    if (!element) return undefined

    const media = window.matchMedia('(max-width: 768px)')
    if (!media.matches) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMobileActive(entry.isIntersecting && entry.intersectionRatio >= 0.52)
      },
      {
        threshold: [0, 0.25, 0.52, 0.75, 1],
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={itemRef}
      className={`experienceItem ${
        item.side === 'left' ? 'experienceItemLeft' : 'experienceItemRight'
      } ${started ? 'experienceItemStarted' : ''} ${
        mobileActive ? 'experienceItemMobileActive' : ''
      }`}
      style={{ '--experience-delay': `${0.55 + index * 0.6}s` }}
    >
      <span className="experienceBigNumber" aria-hidden="true">
        {item.id}
      </span>

      <span className="experienceConnector" aria-hidden="true" />

      <span className="experienceNode" aria-hidden="true">
        <i />
      </span>

      <div className="experienceCard">
        <div className="experienceCardTop">
          <span className="experienceType">{item.type}</span>

          <a
            href={item.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="experienceLinkedin"
            aria-label={`View ${item.title} on LinkedIn`}
          >
            View on LinkedIn
            <span>↗</span>
          </a>
        </div>

        <h3>{item.title}</h3>
        {item.role && <h4>{item.role}</h4>}

        <div className="experienceOrganization">
          <span className="experienceOrgIcon">✦</span>
          <div>
            <span>{item.organization}</span>
            <small>{item.university}</small>
          </div>
        </div>

        <p>{item.description}</p>

        <div className="experienceTags">
          {item.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

function Experience() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      className={`experience ${started ? 'experienceStarted' : ''}`}
      id="experience"
      ref={sectionRef}
    >
      <div className="experienceStars" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className={`experienceStar experienceStar${index + 1}`}
          />
        ))}
      </div>

      <div className="experienceContainer">
        <header className="experienceIntro">
          <div className="experienceLabel">
            <span>EXPERIENCE</span>
            <i />
          </div>

          <h2>
            Experience &amp;
            <br />
            <strong>Leadership.</strong>
          </h2>

          <p>
            Roles, communities and experiences that have helped me grow through
            collaboration, responsibility and leadership.
          </p>
        </header>

        <div className="experienceTimeline">
          <span className="experienceTimelineBase" />
          <span className="experienceTimelineProgress" />
          <span className="experienceTimelineStart" />
          <span className="experienceTimelineEnd" />
        </div>

        <div className="experienceItems">
          {experiences.map((item, index) => (
            <ExperienceCard
              key={item.id}
              item={item}
              index={index}
              started={started}
            />
          ))}
        </div>

        <div className="experienceMore" aria-hidden="true">
          <i />
          <span>MORE TO COME</span>
        </div>
      </div>
    </section>
  )
}

export default Experience
