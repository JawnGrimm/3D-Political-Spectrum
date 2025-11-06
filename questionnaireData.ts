import type { Question } from './types';

export const questions: Question[] = [
  // Section 1: Economic Views (X-Axis: Left <-> Right)
  { text: 'Government should implement a universal basic income.', axis: 'x', reverse: false, weight: 1 },
  { text: 'Publicly funded healthcare is more efficient and just than private healthcare.', axis: 'x', reverse: false, weight: 1 },
  { text: 'Key industries, like utilities, should be publicly owned.', axis: 'x', reverse: false, weight: 1 },
  { text: 'The government should provide free higher education for all its citizens.', axis: 'x', reverse: false, weight: 1 },
  { text: 'Corporate tax rates should be significantly increased to fund social programs.', axis: 'x', reverse: false, weight: 1 },
  { text: 'Wealth and inheritance should be taxed at a higher rate to reduce inequality.', axis: 'x', reverse: false, weight: 1 },
  { text: 'Labor unions are essential for protecting workers\' rights and should be strengthened.', axis: 'x', reverse: false, weight: 1 },
  { text: 'Environmental regulations are a necessary check on corporate activity.', axis: 'x', reverse: false, weight: 1 },
  { text: 'A progressive tax system, where the wealthy pay a higher percentage, is the fairest system.', axis: 'x', reverse: false, weight: 1 },
  { text: 'The free market, without government interference, is the best way to allocate resources.', axis: 'x', reverse: true, weight: 1 },
  { text: 'Lowering taxes on businesses is the best way to stimulate economic growth.', axis: 'x', reverse: true, weight: 1 },
  { text: 'Government regulations on business are an unnecessary burden that stifles innovation.', axis: 'x', reverse: true, weight: 1 },
  { text: 'Privatizing state-owned enterprises generally leads to better outcomes.', axis: 'x', reverse: true, weight: 1 },
  { text: 'Individuals should be responsible for their own retirement, not the state.', axis: 'x', reverse: true, weight: 1 },
  { text: 'If people want to succeed, they should rely on their own hard work, not government programs.', axis: 'x', reverse: true, weight: 1 },
  { text: 'Trade protectionism is ultimately harmful to the economy and should be avoided.', axis: 'x', reverse: true, weight: 1 },
  { text: 'The pursuit of profit is what drives progress and innovation in society.', axis: 'x', reverse: true, weight: 1 },
  { text: 'Minimum wage laws harm the economy by increasing unemployment.', axis: 'x', reverse: true, weight: 1 },

  // Section 2: Governance Views (Y-Axis: Libertarian <-> Authoritarian)
  { text: 'State surveillance is a necessary tool to combat crime and terrorism.', axis: 'y', reverse: true, weight: 1 },
  { text: 'A strong military is essential for maintaining peace and order in the world.', axis: 'y', reverse: true, weight: 1 },
  { text: 'Law enforcement should have more power to stop and search individuals.', axis: 'y', reverse: true, weight: 1 },
  { text: 'National security concerns should sometimes take precedence over individual liberties.', axis: 'y', reverse: true, weight: 1 },
  { text: 'A strong, centralized government is necessary to solve complex societal problems.', axis: 'y', reverse: true, weight: 1 },
  { text: 'Disobedience to the law is never justified, even if the law is unjust.', axis: 'y', reverse: true, weight: 1 },
  { text: 'Harsh sentences are the most effective deterrent to crime.', axis: 'y', reverse: true, weight: 1 },
  { text: 'It is important for the government to promote a shared national identity.', axis: 'y', reverse: true, weight: 1 },
  { text: 'The government should have no say in personal matters like drug use.', axis: 'y', reverse: false, weight: 1 },
  { text: 'People should have the right to protest and engage in civil disobedience.', axis: 'y', reverse: false, weight: 1 },
  { text: 'Decentralized, local governments are more effective than a large central government.', axis: 'y', reverse: false, weight: 1 },
  { text: 'International law should be prioritized over national interests.', axis: 'y', reverse: false, weight: 1 },
  { text: 'The use of military force by our country is often excessive.', axis: 'y', reverse: false, weight: 1 },
  { text: 'Whistleblowers who expose government wrongdoing are heroes.', axis: 'y', reverse: false, weight: 1 },
  { text: 'Individual freedom is the most important political value.', axis: 'y', reverse: false, weight: 1 },
  { text: 'The government has no right to monitor the private communications of its citizens.', axis: 'y', reverse: false, weight: 1 },

  // Section 3: Cultural Views (Z-Axis: Progressive <-> Traditionalist)
  { text: 'Same-sex marriage should be legally recognized.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Transgender individuals should be able to use public facilities that align with their gender identity.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Comprehensive sex education should be taught in schools.', axis: 'z', reverse: false, weight: 1 },
  { text: 'A woman should have the right to choose to have an abortion.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Society benefits greatly from multiculturalism.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Art should be free to challenge established norms, even if it offends some.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Religious institutions should not receive public funding.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Euthanasia should be legal for terminally ill patients.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Recreational drug use between consenting adults should be decriminalized.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Scientific evidence should be the primary basis for public policy.', axis: 'z', reverse: false, weight: 1 },
  { text: 'Traditional family structures are essential for a stable society.', axis: 'z', reverse: true, weight: 1 },
  { text: 'Schools should teach respect for authority and traditional values.', axis: 'z', reverse: true, weight: 1 },
  { text: 'Immigration should be more strictly controlled to preserve our national culture.', axis: 'z', reverse: true, weight: 1 },
  { text: 'It is important to maintain our country\'s traditional moral standards.', axis: 'z', reverse: true, weight: 1 },
  { text: 'Marriage should be exclusively between a man and a woman.', axis: 'z', reverse: true, weight: 1 },
  { text: 'Abortion is morally wrong and should be illegal in most cases.', axis: 'z', reverse: true, weight: 1 },
  { text: 'Religious values should play a more prominent role in public life.', axis: 'z', reverse: true, weight: 1 },
  { text: 'Children should be taught to be proud of their country\'s history.', axis: 'z', reverse: true, weight: 1 },
  { text: 'There are certain gender roles that are natural and should be encouraged.', axis: 'z', reverse: true, weight: 1 },
  { text: 'Pornography is harmful to society and should be heavily restricted.', axis: 'z', reverse: true, weight: 1 },
];

type AxisConfig = {
    min: number;
    max: number;
};

function getAxisConfig(axis: 'x' | 'y' | 'z'): AxisConfig {
    const axisQuestions = questions.filter(q => q.axis === axis);
    const totalWeight = axisQuestions.reduce((sum, q) => sum + q.weight, 0);
    // Assuming a 1-5 answer scale
    return {
        min: totalWeight * 1,
        max: totalWeight * 5,
    };
}

export const AXIS_CONFIGS = {
    x: getAxisConfig('x'),
    y: getAxisConfig('y'),
    z: getAxisConfig('z'),
};
