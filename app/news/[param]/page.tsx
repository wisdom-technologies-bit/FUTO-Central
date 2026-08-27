import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticlePage, CategoryPage } from '@/components/futo/publishing-pages'
import { getPublishedArticleBySlug } from '@/lib/news-db'
const map:Record<string,string>={'campus-news':'Campus News','academics':'Academics','student-life':'Student Life','events':'Events','sports':'Sports','technology-innovation':'Technology & Innovation','opportunities':'Opportunities','community':'Community'}
export async function generateMetadata({params}:{params:Promise<{param:string}>}):Promise<Metadata>{const {param}=await params;const article=await getPublishedArticleBySlug(param);const category=map[param];return {title:article?`${article.title} | FUTO Central`:category?`${category} News | FUTO Central`:'FUTO Central News',description:article?.excerpt||`Read the latest ${category?.toLowerCase()||'FUTO'} news and stories on FUTO Central.`}}
export default async function Page({params}:{params:Promise<{param:string}>}){const {param}=await params;if(map[param])return <CategoryPage category={map[param]}/>;if(getArticleBySlug(param))return <ArticlePage slug={param}/>;notFound()}
export function generateStaticParams(){return [...Object.keys(map),...articles.map((article)=>article.slug)].map((param)=>({param}))}
