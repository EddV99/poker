import { HandRanking, HandRankings } from "../src/poker/hands";
import { PokerHand } from "../src/poker/player";
import { CommunityCards } from "../src/poker/game";
import { Rank, Suit, PokerCard } from "../src/poker/card";

test("Hand:{C2 C3}  CommunityCards:{C4 C5 C6 CJ CQ} is a straight flush", () => {
  let hand = new PokerHand(new PokerCard(Suit.CLUBS, Rank.TWO), new PokerCard(Suit.CLUBS, Rank.THREE));
  let cc = new CommunityCards(
    new PokerCard(Suit.CLUBS, Rank.FOUR),
    new PokerCard(Suit.CLUBS, Rank.FIVE),
    new PokerCard(Suit.CLUBS, Rank.SIX), // highest in the straight flush
    new PokerCard(Suit.CLUBS, Rank.JACK),
    new PokerCard(Suit.CLUBS, Rank.QUEEN),
  );
  let highest = Rank.SIX;

  let ranker = new HandRanking();
  let handRank = ranker.getHandRanking(hand, cc);

  expect(handRank).toBe(HandRankings.STRAIGHT_FLUSH + highest);
});

test("Hand:{C2 C3}  CommunityCards:{C4 H5 C6 CJ CQ} is not a straight flush", () => {
  let hand = new PokerHand(new PokerCard(Suit.CLUBS, Rank.TWO), new PokerCard(Suit.CLUBS, Rank.THREE));
  let cc = new CommunityCards(
    new PokerCard(Suit.CLUBS, Rank.FOUR),
    new PokerCard(Suit.HEARTS, Rank.FIVE),
    new PokerCard(Suit.CLUBS, Rank.SIX), // highest in the straight flush
    new PokerCard(Suit.CLUBS, Rank.JACK),
    new PokerCard(Suit.CLUBS, Rank.QUEEN),
  );
  let highest = Rank.SIX;

  let ranker = new HandRanking();
  let handRank = ranker.getHandRanking(hand, cc);

  expect(handRank).not.toBe(HandRankings.STRAIGHT_FLUSH + highest);
});

test("Hand:{CK CA}  CommunityCards:{C4 H5 C10 CJ CQ} is a straight flush", () => {
  let hand = new PokerHand(new PokerCard(Suit.CLUBS, Rank.ACE), new PokerCard(Suit.CLUBS, Rank.KING));
  let cc = new CommunityCards(
    new PokerCard(Suit.CLUBS, Rank.FOUR),
    new PokerCard(Suit.HEARTS, Rank.FIVE),
    new PokerCard(Suit.CLUBS, Rank.TEN),
    new PokerCard(Suit.CLUBS, Rank.JACK),
    new PokerCard(Suit.CLUBS, Rank.QUEEN),
  );
  let highest = Rank.ACE;

  let ranker = new HandRanking();
  let handRank = ranker.getHandRanking(hand, cc);

  expect(handRank).toBe(HandRankings.STRAIGHT_FLUSH + highest);
});

test("Hand:{CK CA}  CommunityCards:{SK HK DK CJ CQ} is a four of a kind", () => {
  let hand = new PokerHand(new PokerCard(Suit.CLUBS, Rank.ACE), new PokerCard(Suit.CLUBS, Rank.KING));
  let cc = new CommunityCards(
    new PokerCard(Suit.SPADES, Rank.KING),
    new PokerCard(Suit.HEARTS, Rank.KING),
    new PokerCard(Suit.DIAMONDS, Rank.KING),
    new PokerCard(Suit.CLUBS, Rank.JACK),
    new PokerCard(Suit.CLUBS, Rank.QUEEN),
  );
  let highest = Rank.KING;

  let ranker = new HandRanking();
  let handRank = ranker.getHandRanking(hand, cc);

  expect(handRank).toBe(HandRankings.FOUR_OF_A_KIND + highest);
});

test("Hand:{CK CA}  CommunityCards:{SK HK DJ CJ CQ} is a four of a kind", () => {
  let hand = new PokerHand(new PokerCard(Suit.CLUBS, Rank.ACE), new PokerCard(Suit.CLUBS, Rank.KING));
  let cc = new CommunityCards(
    new PokerCard(Suit.SPADES, Rank.KING),
    new PokerCard(Suit.HEARTS, Rank.KING),
    new PokerCard(Suit.DIAMONDS, Rank.JACK),
    new PokerCard(Suit.CLUBS, Rank.JACK),
    new PokerCard(Suit.CLUBS, Rank.QUEEN),
  );
  let highest = Rank.KING * Rank.KING + Rank.JACK;

  let ranker = new HandRanking();
  let handRank = ranker.getHandRanking(hand, cc);

  expect(handRank).toBe(HandRankings.FULL_HOUSE + highest);
});
