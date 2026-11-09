import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: 관심 차종을 이미 골랐으면 /feed 로
  return <Redirect href="/onboarding" />;
}
