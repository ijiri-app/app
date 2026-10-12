import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: 관심 차종을 아직 고르지 않았으면 /onboarding/interest-cars 로
  return <Redirect href="/feed" />;
}
