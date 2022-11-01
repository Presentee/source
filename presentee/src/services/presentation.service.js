import http from "../http-common";

class PresentationDataService {
  getAll() {
    return http.get("/presentations");
  }

  get(id) {
    return http.get(`/presentations/${id}`);
  }

  create(data) {
    return http.post("/presentations", data);
  }

  update(id, data) {
    return http.put(`/presentations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/presentations/${id}`);
  }

  deleteAll() {
    return http.delete(`/presentations`);
  }

  findByTitle(title) {
    return http.get(`/presentations?title=${title}`);
  }
}

export default new PresentationDataService();
