import {
  Box,
  Flex,
  Heading,
  Img,
  Link,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import { BlogCard } from '@components/blog/blogcard'
import { Header } from '@components/blog/header'
import { getSanityContent } from '@utils/sanity';
import { BsArrowRight, BsClockFill } from 'react-icons/bs'

export default function blog({ posts }) {
  console.log(posts)
  return (
    <Layout home>
      <Head>
        <title>{posts.title}</title>
      </Head>
      <Header 
        title={posts[0].title}
        image={posts[0].mainImage}
        slug={posts[0].slug}
      />
      
      <Box as="section" bg={mode('white.50', 'gray.800')} py={{ base: '10', sm: '24' }}>
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="12" mb="10">
          {posts.slice(1).map(({ title, slug, mainImage, authorName, authorPic }) => (
            <BlogCard
              media={mainImage}
              title={title}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
              href={slug}
              author={{ name: "Daniel", href: '#' }}
            />
            ))}

          </SimpleGrid>
          <Link fontSize="xl" fontWeight="bold" color={mode('blue.600', 'blue.400')}>
            <span>View all articles</span>
            <Box as={BsArrowRight} display="inline-block" ms="2" />
          </Link>
        </Box>
      </Box>
    </Layout>
  )
}



export async function getStaticProps() {
  const data = await getSanityContent({
    query: `
      query AllPosts {
        allPost {
          title
          categories {
            title
          }
          mainImage {
            asset{
              url
            }
          }
          slug{
            current
          } 
          content
          author {
            name
            image {
              asset {
                url
              }
            }
          }
        }
      }
    `,
  });



  const posts = data.allPost.map((post) => ({
    title: post.title,
    slug:  `/blog/${post.slug.current}`,
    mainImage: post.mainImage.asset.url,
    body: post.content,
    authorName: post.author.name,
    authorPic: post.author.image.asset.url
  }));

  return {
    props: { posts },
  };
}