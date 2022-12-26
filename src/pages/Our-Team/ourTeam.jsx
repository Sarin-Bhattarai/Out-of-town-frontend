import React, { useState, useEffect } from "react";
import "./team.css";
import { getTeams } from "../../utils/api/teamApi";
import TeamImage from "../../utils/data/teamImage";

const OurTeam = () => {
  const [state, setState] = useState({
    teams: [],
    error: null,
  });

  const fetchTeams = () => {
    setState({ ...state, error: null });
    getTeams()
      .then(({ data }) => setState({ ...state, teams: data, error: null }))
      .catch({ ...state, error: null });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <section className="team">
      <div className="container">
        <div className="heading">
          <h3>Our Team</h3>
        </div>
        <div className="team-details">
          {state?.teams?.map((t) => {
            return (
              <>
                <div className="team-grid">
                  <TeamImage region={t?.image} url="teams" />
                  <h1>{t?.name}</h1>
                  <p>{t?.role}</p>
                </div>
              </>
            );
          })}
        </div>

        <div className="terms">
          <h1
            style={{
              textAlign: "center",
              fontSize: "32px",
              textDecoration: "underline",
            }}
          >
            Terms & Conditions
          </h1>

          <div className="conditions">
            <p>
              Bank wire service charge should be paid by the clients themselves
              at the time of deposit. In addition, payment by Credit Card( Visa,
              Master or American express) also possible. Please ask detail
              information regarding payment process by Credit card at Payment
              Methods/options. 4 % extra bank surchare is applicable if you wish
              to make payment by credit cards. Out of Town Adventure Pvt. Ltd.
              is a Nepal based local trekking agency which is a trustworthy and
              registered Company under the laws of Nepal Tourism Industry and
              accepts your bookings under the following terms and conditions.
              All bookings are made with Out of Town Adventure Pvt. Ltd.,
              Registered Company Number 207765/075/076 (hereinafter referred to
              as The Company) whose registered office is the Pokhara-6 khahara,
              Nepal. The Head of The Company is <b>Bishow Raj Adhikari</b>.
            </p>

            <ul className="ul-team">
              <li>
                The time duration “trip” used in this web internet page and
                booking prerequisites refer to all itineraries described on this
                website together with these which may otherwise be recognized as
                walking, tours, trekking trips, sightseeing, climbing,
                mountaineering, expeditions, or holidays.
              </li>
              <li>
                To tightly closed reserving of any trip, 35 %(Non- Refundable)
                down the price from Total Trip fee is required to make in give a
                boost to as per the business enterprise policy, this credit
                score helps us to make affirm reservation of Hotels in City,
                domestic flights and all one-of-a-kind day time out preparations
                for ultimate trip booking. Along with savings we want targeted
                Name lists of Participants( equal as a passport), Gender,
                Nationality, Date of birth, passport number, passport
                issue/Expiry dates &amp;amp; profession( you need to ship us
                passport replica using the skill of fax or attached through
                e-mail for all journeys in Nepal, Tibet, and Bhutan )
              </li>
              <li>
                The rest of the costs want to clear on arrival day (this will
                follow for most of Out of Town Adventure Pvt. Ltd.). However, we
                can request you to make full cost earlier than your arrival if
                this is quintessential (especially for Trips in Tibet and Bhutan
                ). Be mindful, we also reserve the right to cancel your day out
                furnished full volume is now not paid in requested time or on
                arrival day.
              </li>
              <li>
                Any day trip reserving Payment procedures is very easy with Out
                of Town Adventure Pvt. Ltd... We are given your remaining minute
                reserving also, but the full charge of the total tour fee has to
                be made in decorating if essential or can pay the full cost on
                arrival day.
              </li>
              <li>
                On our holiday trips tour/trek packages, rooms, or tents are
                supplied on a twin sharing basis. Thus, single room complement
                cost will be imposed on the consumer who does not have any
                different tour participant to share room/tent with.
              </li>
              <li>
                No refund will be made to consumers who drop out from the trip
                regardless of whatever components stay unused in the itinerary.
                In case of the journey damaged of early return upon client’s
                very own want or causes, Out of Town Adventure shall no longer
                be accountable to any refund of the days now not utilized.
                Clients have to pay for the lodge or any extra expenses incurred
                after leaving the itinerary.
              </li>
              <li>
                It is a necessary circumstance that you well known that this is
                a riding tour. This requires some flexibility. The day-to-day
                itinerary is taken as a tenet only. We can no longer be held
                accountable for any delays delivered through International or
                home flights, strikes, Government regulations, local weather or
                herbal casualties, etc. In such cases, We shall be accountable
                for providing suitable options which should be decided upon
                mutual agreement. If an agreement cannot be made, Out of Town
                Adventure shall be solely responsible for refund after deducting
                costs already incurred.
              </li>
              <li>
                If you no longer show off at the assembly aspect exclusive on
                the agreed date, we will assume you have been delayed and will
                wait for you to contact us with your new predicted arrival date.
                If you do no longer contact us within forty eight hours we will
                expect you have cancelled the tour. There is no refund of any
                money paid.
              </li>
              <li>
                The excursions will now not be canceled until we are compelled
                to do so due to the reality of special or unforeseeable
                conditions (force majored), such as a major herbal disaster,
                primary political unrest, or war. If we cancel the tour we will
                be barring extend refund of all repayments made to us, i.e.
                barring for the deposit. We shall now not be in cost to refund
                any extra prices that you may moreover have incurred (such as
                insurance, visas, vaccinations, and special incidental costs).
              </li>
              <li>
                The trek statistics sheets and the file supply facts and
                stipulations touching on to the tour and are deemed to be a
                section of the contract and so you want to be sincerely aware of
                their contents. However the itinerary is an indication of what
                the group ought to accomplish, however now not a contractual
                obligation- Changes might also additionally be made because of
                spectacular weather, flight cancellations, disease, or different
                unforeseeable circumstances- No refunds are given for unused
                offerings or unrealized dreams. We do grant sympathy though.
              </li>
              <li>
                All records and recommendations supplied (vaccinations, climate,
                trekking equipment, visas, etc) are given in true have
                confidence but besides accountability employing us.
              </li>
              <li>
                We reserve the acceptable to revise pricing charge posted at our
                website, beneath any circumstances, or on the stress of a range
                of exterior factors that are similarly than our control, for
                event changes in change rate, authorities action, etc. But, we
                put forth the effort to preserve the existing rate. In case of
                minor make larger in flights fares, motels, or distinct
                associated factors, we don’t revise the fee of the day out which
                was once already confirmed &amp;amp; booked through the deposit.
              </li>
              <li>
                A tour/trek information who represents Out of Town Adventure
                Pvt. Ltd. deserves all authority at some stage in your tours. If
                you commit any illegal act, you are compelled to depart the
                tour. No refund will be made in such a case.
              </li>
              <li>
                We put us each effort to make certainly satisfied visiting of
                yours, however, it is ought to apprehend that what you would
                possibly be accustomed to in the western prosperous countries,
                the Himalayan global places can’t have the funds for such
                facilities. Weather is every other thing that right away has an
                effect on your journey. Hence, persistence in mind, enthusiasm
                and suited practice beforehand than the head need to to
                undertaking into journey.
              </li>
              <li>
                You have to buy whole travel insurance plan package deal closer
                to medical, herbal calamity, helicopter evacuation, non-public
                accident etc. This is strongly advised to all our esteemed
                clients.
              </li>
              <li>
                To make modifications of any trek / tour itinerary, prior be
                aware is requested. You’re suggested to remain in contact with
                us thus. But occasionally, you might also be obliged to do so en
                route underneath high quality circumstance for instance awful
                weather etc.
              </li>
              <li>
                All critical archives need to be in sequence for instance to
                trouble visas, indispensable approves, etc. We’re now not to
                blame in case of any time out formality now not performed in
                time previously than the day out departs on the absence of
                quintessential papers and documents.
              </li>
              <li>
                You apprehend that all via the route of the time out sure
                occasions can additionally occur, including, on the other hand
                no longer confined to, accident or sickness in ways flung places
                without scientific facilities, political instability, and the
                forces of nature. You agree to expect all risks related to the
                day out to the most extent permitted thru Nepalese law.
              </li>
              <li>
                You properly recognized that Out of Town Adventure Pvt. Ltd.
                contracts with a community of companies, authorities groups and
                individuals, to resource in the walking of its tours, treks,
                walking, holidays &amp;amp; expeditions. To the great of Out of
                Town Adventure Pvt. Ltd. knowledge, these 0.33 events are
                certified to function the obligations they are gotten smaller to
                perform. However, Out of Town Adventure Pvt., Ltd. will not be
                held responsible for any injury, damage, loss, delay, or
                irregularity that might also take vicinity due to the conduct of
                these 1/3 parties.
              </li>
              <li>
                Out of Town Adventure Pvt., Ltd. will no longer get hold of duty
                or legal responsibility for any traveler who contravenes any
                legislation.
              </li>
              <li>
                Participants have to be inappropriate fitness and bodily
                condition. Contributors with pre- existing scientific troubles
                or prerequisites must make these conscious of Out of Town
                Adventure Pvt. Ltd. at the time of booking. Medical and
                evacuation expenditures are the obligation of the participant.
                It is also imperative that you seek advice from your scientific
                health practitioner for vaccination and specific scientific
                requirements for your day trip earlier than you depart.
              </li>
              <li>
                The bad climate in mountain areas can cause domestic flight
                delays, especially in Everest, Jomsom, phaplu, Simikot,
                Kanchenjunga, and any different faraway mountain areas in Nepal.
                In the trip of delayed domestic flights, Out of Town Adventure
                Pvt., Ltd. will meet departing town lodging fees before your
                trip, if the value of lodging is attainable to cowl by using the
                ability of the Budget of that day. Out of Town Adventure Pvt.
                Ltd. reserves the right to reroute treks or use street transport
                for extended delays however these adjustments may additionally
                have an effect on the time-out cost, which you have to bear. Out
                of Town Adventure Pvt. Ltd. does no longer get hold of any
                accountability for costs incurred as a cease result of ignored
                international flight connection however will help to make
                alternative preparations the location viable with extra costs.
              </li>
              <li>
                Trekking in the ways flung areas or in as described above, in
                particular at some stage in the notable season, you’re rather
                recommended to reserve more days to put collectively with some
                delays to avoid aggravating the last result We are concerned
                with your safety. We will complete our duty honestly and
                sincerely. A huge thanks to you for providing an opportunity to
                serve you!!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
