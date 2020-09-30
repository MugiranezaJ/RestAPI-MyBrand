
import chai from 'chai'
import chaiHttp from 'chai-http'
import {projectsModel} from '../../models/models.js'
import { token } from '../../config/previlage.js';
chai.use(chaiHttp)
export function testProjects(app) {

    describe('Projects', function(){
        this.timeout(5000); 
        it('it should GET all the Projects', (done) => {
            //.timeout(30 * 1000)
            chai.request(app)
                .get('/api/projects/view')
                //.set({"Authorization": token})
                .end((err, res) => {
                    if(err) done(err)
                    chai.expect(res).have.status(200);
                    chai.expect(res.body).length(res.body.length).greaterThan(0);
                    done();
                })
        });
        it("should return 403 if no Authorization", (done)=>{
            chai.request(app)
            .post("/api/projects/add")
            .send(
                {"title":"json"},
                {"skill_image":"skills.png"},
                {"description":"hello there"}
            )
            .then((res) =>{
                chai.expect(res).to.have.status(403)
                done()
            })
            .catch((err) =>{
                done(err)
            })
                
        })
    })
}
