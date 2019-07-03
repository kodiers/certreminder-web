import { TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ExamService } from './exam.service';
import {Certification} from '../../shared/models/certification.model';
import {API_URL} from '../../shared/constants';
import {Exam} from '../../shared/models/exam.model';

const cert = new Certification(1, new Date(), new Date(), 'test', '5A', 'test.jpg',
  'test', false, 1);
const exam = new Exam(1, new Date(), new Date(), 'test', 'test1', 'test', false,
  [cert.id]);

describe('ExamService', () => {
  let httpTestingController: HttpTestingController;
  let examService: ExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    examService = TestBed.get(ExamService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(examService).toBeTruthy();
  });

  it('should get exam for certification', () => {
    const mockResponse = [exam];
    examService.getExamsForCertification(cert).subscribe(data => {
      let receivedExam = data[0];
      expect(receivedExam.id).toEqual(exam.id);
      expect(receivedExam.created).toEqual(exam.created);
      expect(receivedExam.updated).toEqual(exam.updated);
      expect(receivedExam.title).toEqual(exam.title);
      expect(receivedExam.number).toEqual(exam.number);
      expect(receivedExam.description).toEqual(exam.description);
      expect(receivedExam.deprecated).toBeTruthy();
      expect(receivedExam.certification[0]).toEqual(cert.id);
    });
    const req = httpTestingController.expectOne(API_URL + `certifications/exam/?certification=${cert.id}`);
    req.flush(mockResponse);
  });

  it('should get exams for vendor', () => {
    const mockResponse = [exam];
    examService.getExamsForVendorId(1).subscribe(data => {
      console.log(data);
      let receivedExam = data[0];
      expect(receivedExam.id).toEqual(exam.id);
      expect(receivedExam.created).toEqual(exam.created);
      expect(receivedExam.updated).toEqual(exam.updated);
      expect(receivedExam.title).toEqual(exam.title);
      expect(receivedExam.number).toEqual(exam.number);
      expect(receivedExam.description).toEqual(exam.description);
      expect(receivedExam.deprecated).toBeTruthy();
      expect(receivedExam.certification[0]).toEqual(cert.id);
    });
    const req = httpTestingController.expectOne(API_URL + 'certifications/exam/?certification__vendor=1');
    req.flush(mockResponse);
  });
});
