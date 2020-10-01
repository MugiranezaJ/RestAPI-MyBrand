
import chai from 'chai'
import chaiHttp from 'chai-http'
import {profileModel} from '../../models/models.js'
import { token } from '../../config/previlage.js';
chai.use(chaiHttp)
export function testProfile(app) {

    describe('Profile', function(){
        this.timeout(5000); 
        it('it should GET Profile Information', (done) => {
            //.timeout(30 * 1000)
            chai.request(app)
                .get('/api/Profile/view')
                //.set({"Authorization": token})
                .end((err, res) => {
                    if(err) done(err)
                    chai.expect(res).have.status(200);
                    chai.expect(res.body).length(res.body.length).greaterThan(0);
                    done();
                })
        });
    })
}
